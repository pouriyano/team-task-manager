const { Task } = require('../model/task');
const { Team } = require('../model/team');
const Joi = require('joi');

const createTask = async (req, res) => {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        description: Joi.string().allow(""),
        username: Joi.string().required(),
        teamName: Joi.string().required(),
        leaderUsername: Joi.string().required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
       
        const [userRow] = await Team.getUserId(value.username);
        const user = userRow[0];
        if (!user) return res.status(404).json({ error: "User not found" });

        
        const [leaderRow] = await Team.getUserId(value.leaderUsername);
        const leader = leaderRow[0];
        if (!leader) return res.status(404).json({ error: "Leader user not found" });

        const [teamRows] = await Team.getTeamByName(value.teamName);
        const team = teamRows[0];
        if (!team) return res.status(404).json({ error: "Team not found" });

        if (team.leader_id !== leader.id) {
            return res.status(403).json({ error: "Only the team leader can create tasks for this team." });
        }

     
        const result = await Task.createTask(value.title, value.description, user.id, value.teamName);
        res.status(200).json({ message: "Task created", data: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.getAllTasks();
        res.status(200).json({ data: tasks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getTasksByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const tasks = await Task.getTasksByUsername(username);
        res.status(200).json({ data: tasks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getTasksByTeam = async (req, res) => {
    const { teamName } = req.params;
    try {
        const tasks = await Task.getTasksByTeam(teamName);
        res.status(200).json({ data: tasks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { username } = req.body;
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        description: Joi.string().allow(""),
        username: Joi.string().required() 
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
       
        const [userRows] = await Team.getUserId(value.username);
        if (!userRows[0]) return res.status(404).json({ error: "User not found" });
        const userId = userRows[0].id;

        const [taskRows] = await Task.getTaskById(taskId);
        if (!taskRows[0]) return res.status(404).json({ error: "Task not found" });
        const task = taskRows[0];

    
        const [teamRows] = await Team.getTeamByName(task.teamName);
        if (!teamRows[0]) return res.status(404).json({ error: "Team not found" });
        const team = teamRows[0];

    
        if (team.leader_id !== userId) {
            return res.status(403).json({ error: "Only the team leader can update tasks" });
        }

        const result = await Task.updateTask(taskId, value.title, value.description);
        return res.status(200).json({ message: "Task updated", data: result });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    const { username } = req.body;

    if (!username) return res.status(400).json({ error: "Username is required" });

    try {
        const [userRows] = await Team.getUserId(username);
        if (!userRows[0]) return res.status(404).json({ error: "User not found" });
        const userId = userRows[0].id;

        const [taskRows] = await Task.getTaskById(taskId);
        if (!taskRows[0]) return res.status(404).json({ error: "Task not found" });
        const task = taskRows[0];

        const [teamRows] = await Team.getTeamByName(task.teamName);
        if (!teamRows[0]) return res.status(404).json({ error: "Team not found" });
        const team = teamRows[0];

        if (team.leader_id !== userId) {
            return res.status(403).json({ error: "Only the team leader can delete tasks" });
        }

        const result = await Task.deleteTask(taskId);
        return res.status(200).json({ message: "Task deleted", data: result });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


module.exports = {
    createTask,
    getAllTasks,
    getTasksByUsername,
    getTasksByTeam,
    updateTask,
    deleteTask
};
