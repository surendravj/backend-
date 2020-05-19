const User = require('../models/user');
const Order = require('../models/order');


// params controllers
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: "User not found" });
        }
        req.profile = user;
        next();
    })
}

// -------------------------------------------------X----------------------------------------------------------


// route controllers
exports.getUser = (req, res) => {
    const { name, lastname, email, role, purchases } = req.profile;
    return res.status(200).json({ user: { name, lastname, email, role, purchases } });
}


exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {
            _id: req.profile._id
        },
        {
            $set: req.body
        },
        {
            new: true, useFindAndModify: false
        }, (err, user) => {
            if (err) {
                return res.json(400).json({ error: 'Your are not authroized' });
            }
            const { name, lastname, email, role, purchases } = user;
            return res.json({ user: { name, lastname, email, role, purchases } });
        })
}


exports.getUserPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id name email").exec((err, order) => {
            if (err) {
                return res.status(400).json({ error: "Order list is empty" });
            } return res.status(200).json(order);
        })
}

// -------------------------------------------------------------------X---------------------------------------------

// custom middlewares
exports.getOrderIntoPurchaseList = (req, res, next) => {
    let purchaseList = [];
    req.body.Order.products.forEach(product => {
        purchaseList.push(
            {
                _id: product._id,
                name: product.name,
                decription: product.decription,
                category: product.category,
                amount: req.body.Order.amount,
                transaction_id: req.body.Order.transaction_id
            }
        );
    });
    // updating the purchase list in DB
    User.findByIdAndUpdate({ _id: req.profile._id },
        { $push: { purchases: purchaseList } }, { new: true }, (err, purchases) => {
            if (err) {
                return res.status(400).json({ error: "Unable to update purchase list" });
            }
            next();
        });
}