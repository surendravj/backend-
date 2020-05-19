const router = require('express').Router();

// importing controller
const { getUserById, getUser,updateUser,getUserPurchaseList} = require('../controllers/user');
const { ensureAuthenticated, isAuthenticated} = require('../controllers/auth');

router.param("userId", getUserById);

// routes
router.get('/user/:userId', ensureAuthenticated, isAuthenticated, getUser);
router.put('/user/:userId', ensureAuthenticated, isAuthenticated, updateUser);
router.get('/user/orders/:userId', ensureAuthenticated, isAuthenticated,getUserPurchaseList);

module.exports = router;