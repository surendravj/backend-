const router = require('express').Router();
const { createComment, getComments } = require('../controllers/portfolio');

router.post('/createcomment', createComment);
router.get('/comments', getComments);


module.exports = router;