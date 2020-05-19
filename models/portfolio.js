const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})



module.exports = mongoose.model('portfolio', portfolioSchema);

