const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    salt: String,
    userInfo: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, { timestamps: true });




module.exports = mongoose.model('User', userSchema);

