const router = require('express').Router();
const { check } = require('express-validator');
const { signup, signout, signin, ensureAuthenticated } = require('../controllers/auth');

router.get('/signout', signout);


router.post('/signup',
    [
        check("name", 'Name should be 3 letters min').isLength({ min: 3 }),
        check("email", 'Invalid email').isEmail(),
        check("password", 'Password at least 5 chacters long').isLength({ min: 5 })
    ],
    signup);


router.post('/signin',
    [
        check("email", 'Invalid email').isEmail(),
        check("password", 'Password at least 5 chacters long').isLength({ min: 5 })
    ], signin);

module.exports = router;