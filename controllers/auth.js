const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const User = require('../models/user');
const { validationResult } = require('express-validator');


// routes controller
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: 'user signed out successfully'
    })
}


exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.json({error: "Bad request" });
        }
        return res.json(user);
    });
}


exports.signin = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const { email, password } = req.body
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ error: 'User not exist' });
            }
            if (user.password != password) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            // generating token
            const token = jwt.sign({ _id: user._id }, process.env.SECREAT);
            //putting token in cookie
            res.cookie("token", token, { expire: new Date() + 9999 });
            // send Response to frontend
            const { _id, name, lastname, email, role, purchases } = user;
            res.status(200).json({ token, user: { _id, name, lastname, email, role, purchases } })

        })
        .catch(e => { res.status(401).json({ error: 'something went wrong' }) })
}


// -----------------------------------------------------------------X---------------------------------------------

// custom middleware
exports.ensureAuthenticated = expressJwt({
    secret: process.env.SECREAT,
    userProperty: "auth"
})

exports.isAuthenticated = (req, res, next) => {
    let checker = (req.profile && req.auth) && req.auth._id == req.profile._id;
    if (!checker) {
        return res.status(403).json({
            'error': 'ACCESS DENIED'
        })
    }
    next();
}


exports.isAdmin = (req, res, next) => {
    if (req.profile.role == 0) {
        return res.status(403).json({
            'error': 'ACCESS DENIED'
        })
    }
    next()
}

