const Product = require('../models/product');
const formidable = require('formidable');
const _ = require("lodash");
const fs = require("fs");

// params controllers
exports.getProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err) {
            return res.status(400).json({ message: "Unable to find the product" });
        }
        req.product = product;
        next();
    })
};


// router controllers
exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({ error: "Problem with photo" });
        }

        // restrictions on product data
        const { name, description, price, category, stock } = fields;
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({ error: "All fields are required" });
        }

        let product = new Product(fields);
        if (file.photo) {
            if (file.photo.size > 4000000) {
                return res.status(400).json({
                    error: "Image to big to upload"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type
        }
        // save to DB
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({ error: "Unable to save data in db" });
            }
            res.status(200).json(product);
        })
    });
};

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.status(200).json(req.product);
};

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("content-type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

exports.removeProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({ error: "Unable to delete product" });
        }
        return res.status(200).json({ messsage: "Product deleted succesfully" });
    });
};

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if(err){
            res.status(400).json({error:"Unable to load image"})
        }
        // updating the content
        let product = req.product;
        product = _.extend(product, fields);

        if (file.photo) {
            if (file.photo.size > 4000000) {
                return res.status(400).json({
                    error: "Image to big to upload"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type
        }
        // save to DB
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({ error: "Unable to update product in db" });
            }
            res.status(200).json(product);
        })
    });
};

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? req.query.limit : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find().select('-photo').limit(limit).sort([[sortBy, "asc"]])
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({ error: "No products found" });
            }
            return res.status(200).json(products);
        })
}

exports.getAllCategories = (req, res) => {
    Product.distinct("category", {}, (err, cate) => {
        if (err) {
            return res.status(400).json({ error: "Unable to find the categories" });
        }
        return res.status(200).json(cate);
    });
}
// middlwares

exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map((prod) => {
        return {
            updateOne: {
                filter: { _id: prod._ },
                update: { $inc: { stock: -prod.count, sold: +prod.stock } }
            }
        }
    });
    Product.bulkWrite(myOperations, {}, (err, product) => {
        if (err) {
            return res.status(400).json({ error: "Builk operations failed" });
        }
        next();
    });
}