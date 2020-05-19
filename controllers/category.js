const Category = require('../models/category');


// params controllers
exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
        if (err) {
            return res.status(400).json({ error: 'Category not found' });
        }
        req.category = cate;
        next();
    });
}

// ------------------------------------------X-----------------------------------------------------

// route controllers
exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, cate) => {
        if (err) {
            return res.json(402).status({ error: "Unable to save category" });
        }
        return res.status(200).json({ cate });
    })
}

exports.getAllCategories = (req, res) => {
    Category.find({})
        .then(data => {
            return res.json(data)
        })
        .catch(() => {
            return res.json({ error: "No categories found" })
        })
}


exports.getCategory = (req, res) => {
    Category.findById({ _id: req.category._id }).exec((err, category) => {
        if (err) {
            return res.status(402).json({ error: "Category not found with this id" });
        }
        return res.status(200).json(category);
    });
}

exports.updateCategory = (req, res) => {
    Category.findByIdAndUpdate(
        { _id: req.category._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, cate) => {
            if (err) {
                return res.status(402).json({ error: "Something went wrong while updated the content" });
            }
            return res.status(200).json(cate);
        })
}
// ------------------------------------------------------X--------------------------------------------------

exports.removeCategory = (req, res) => {
    const category = req.category;
    category.remove((err, done) => {
        if (err) {
            return res.status(402).json({ error: "Unable to delete the category" });
        }
        return res.status(200).json({ message: 'Succesfully deleted' });
    })
}

//middleware controllers