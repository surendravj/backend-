const router = require('express').Router();
const { isAuthenticated, isAdmin, ensureAuthenticated } = require('../controllers/auth');
const { getUserById, getOrderIntoPurchaseList, } = require('../controllers/user');
const { updateStock } = require('../controllers/product');
const { getOrderById, createOrder, getAllOrders,getOrderStatus,updateOrderStatus} = require('../controllers/order');

// params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// routes
router.post('/order/create/:userId', ensureAuthenticated, isAuthenticated, getOrderIntoPurchaseList, updateStock, createOrder);
router.get('/order/all/:userId', ensureAuthenticated, isAuthenticated, isAdmin, getAllOrders);
router.get('/order/status/:userId', ensureAuthenticated, isAuthenticated, isAdmin, getOrderStatus);
router.put('/order/:productId/status/:userId', ensureAuthenticated, isAuthenticated, isAdmin, updateOrderStatus);




module.exports = router;
