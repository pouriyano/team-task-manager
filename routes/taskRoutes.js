const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskcontroller');
const auth=require('../middlewares/auth')

router.use(auth.authForUser)
router.use(auth.authForTeam)
router.post('task/create', taskController.createTask);
router.get('task/all', taskController.getAllTasks);
router.get('task/user/:username', taskController.getTasksByUsername);
router.get('task/team/:teamName', taskController.getTasksByTeam);
router.put('task/update/:taskId', taskController.updateTask);
router.delete('task/delete/:taskId', taskController.deleteTask);

module.exports = router;
