const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentcontroller');
const auth=require('../middlewares/auth')

router.use(auth.authForUser)

router.post('/comment/create', commentController.createComment);
router.get('comment/task/:task_id', commentController.getCommentsByTaskId);
router.put('comment/update/:id', commentController.updateComment);
router.delete('comment/delete/:id', commentController.deleteComment);

module.exports = router;
