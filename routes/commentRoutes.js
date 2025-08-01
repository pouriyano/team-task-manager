const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentcontroller');
const auth=require('../middlewares/auth')

router.use(auth.authForUser)

router.post('/create', commentController.createComment);
router.get('/task/:task_id', commentController.getCommentsByTaskId);
router.put('/update/:id', commentController.updateComment);
router.delete('/delete/:id', commentController.deleteComment);

module.exports = router;
