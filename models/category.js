const mongoose = require('mongoose');
const schema = mongoose.Schema;

const category = schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxLength: 32
    }
}, { timestamps: true });



module.exports =mongoose.model('Category', category);