const portfolioDb = require('../models/portfolio');

exports.createComment = (req, res) => {
    const { name, comment } = req.body;
    if (!name || !comment) {
        return res.status(400).json({ error: "Insufficent data" });
    }
    else {
        let portfolio = new portfolioDb(req.body);
        portfolio.save().then((result) => {
            return res.status(200).json({ message: "Succesfully created th comment" });
        }).catch((err) => {
            return res.status(400).json({ error: "Something went wrong" });
        });
    }
}



exports.getComments = (req, res) => {
    portfolioDb.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({ error: "Something went wrong" });
        }
        else {
            return res.json(data);
        }
    })
}


exports.deleteComment = (req, res) => {
    const id = req.params.id;
    portfolioDb.deleteOne({ _id: id }).exec((err, data) => {
        if (err) {
            return res.status(400).json({ error: "Something went wrong" });
        }
        return res.status(200).json({ success: "Successfully deleted the comment" });
    })
}