const express = require('express');
const router = express.Router();
const commentController = require('../controller/commentcontroller');
const auth=require('../middlewares/auth')

router.use(auth.authForUser)

router.post('/commment/', commentController.createComment);
router.get('commment/:task_id', commentController.getCommentsByTaskId);
router.put('commment/update/:id', commentController.updateComment);
router.delete('commment/delete/:id', commentController.deleteComment);

module.exports = router;
