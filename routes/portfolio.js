const router = require('express').Router();
const { createComment, getComments,deleteComment} = require('../controllers/portfolio');

router.post('/createcomment', createComment);
router.get('/comments', getComments);
router.delete('/comment/delete/:id',deleteComment);


module.exports = router;


