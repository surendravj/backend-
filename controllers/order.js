const { Order, Cart } = require('../models/order');

// parms controller
exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
        .populate("products.product", "name price quantity")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({ error: "No order found" });
            }
            req.order = order;
            next();
        })
};


// routes controllers
exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, done) => {
        if (err) {
            return res.status(400).json({ error: "Unable to save order in database" });
        }
        return res.status(200).json(done);
    })
}

exports.getAllOrders = (req, res) => {
    Order.find().populate("user", "_id name").exec((err, orders) => {
        if (err) {
            return res.status(400).json({ error: "No Order till now" });
        }
        return res.status(200).json(orders);
    })
}

exports.getOrderStatus = (req, res) => {
    res.status(200).json(Order.schema.path("status").enumValues);
}

exports.updateOrderStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, done) => {
        if (err) {
            return res.status(400).json({ error: 'Unbale to update status' });
        }
        return res.status(200).json(done);
    });
}