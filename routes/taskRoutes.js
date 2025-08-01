const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskcontroller');
const auth=require('../middlewares/auth')

router.use(auth.authForUser)
router.use(auth.authForTeam)
router.post('/task/make', taskController.createTask);
router.get('/task', taskController.getAllTasks);
router.get('/task/user/:username', taskController.getTasksByUsername);
router.get('/task/team/:teamName', taskController.getTasksByTeam);
router.put('/:taskId', taskController.updateTask);
router.delete('/task/:taskId', taskController.deleteTask);

module.exports = router;
