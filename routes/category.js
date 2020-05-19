const router = require("express").Router();
const { getCategoryById, createCategory, getAllCategories, getCategory, updateCategory, removeCategory } = require('../controllers/category');;
const { getUserById } = require('../controllers/user');
const { isAuthenticated, ensureAuthenticated, isAdmin } = require('../controllers/auth');

// params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// routes
router.post('/category/create/:userId', ensureAuthenticated, isAuthenticated, isAdmin, createCategory);
router.get('/category/:categoryId', getCategory);
router.get('/category/all/:categoryId',getAllCategories);
router.put('/category/:categoryId/:userId', ensureAuthenticated, isAuthenticated, isAdmin, updateCategory)
router.delete('/category/:categoryId/:userId', ensureAuthenticated, isAuthenticated, isAdmin, removeCategory)

module.exports = router; 