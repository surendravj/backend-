const router = require('express').Router();
const { getProductById, createProduct, getProduct, photo, removeProduct, updateProduct, getAllProducts,getAllCategories } = require('../controllers/product');
const { ensureAuthenticated, isAdmin, isAuthenticated } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

// parmas
router.param('userId', getUserById);
router.param('productId', getProductById);

//routes
router.post('/product/create/:userId', ensureAuthenticated, isAuthenticated, isAdmin, createProduct);
router.get('/product/:productId', getProduct);
router.get('/product/photo/:productId', photo);
router.get('/product/all/:productId',getAllProducts);
router.get('/product/categories', getAllCategories);
router.put('/product/:productId/:userId', ensureAuthenticated, isAuthenticated, isAdmin, updateProduct);
router.delete('/product/:productId/:userId', ensureAuthenticated, isAuthenticated, isAdmin, removeProduct);



module.exports = router;