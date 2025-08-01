const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskcontroller');
const auth=require('../middlewares/auth')

router.use(auth.authForUser)
router.use(auth.authForTeam)
router.post('/create', taskController.createTask);
router.get('/all', taskController.getAllTasks);
router.get('/user/:username', taskController.getTasksByUsername);
router.get('/team/:teamName', taskController.getTasksByTeam);
router.put('/update/:taskId', taskController.updateTask);
router.delete('/delete/:taskId', taskController.deleteTask);

module.exports = router;
