const { dbpool } = require('../config/database');

const Task = {
    async createTask(title, description, userId, teamName) {
        const query = `
            INSERT INTO tasks (title, description, user_id, team_id)
            VALUES (?, ?, ?, (SELECT id FROM teams WHERE name = ?))
        `;
        const [result] = await dbpool.query(query, [title, description, userId, teamName]);
        return result;
    },

    async getAllTasks() {
        const [rows] = await dbpool.query("SELECT * FROM tasks");
        return rows;
    },

    async getTasksByUsername(username) {
        const query = `
            SELECT t.* FROM tasks t
            JOIN users u ON t.user_id = u.id
            WHERE u.username = ?
        `;
        const [rows] = await dbpool.query(query, [username]);
        return rows;
    },

    async getTasksByTeam(teamName) {
        const query = `
            SELECT t.* FROM tasks t
            JOIN teams tm ON t.team_id = tm.id
            WHERE tm.name = ?
        `;
        const [rows] = await dbpool.query(query, [teamName]);
        return rows;
    },

    async updateTask(taskId, title, description) {
        const querry = `
            UPDATE tasks
            SET title = ?, description = ?
            WHERE id = ?
        `;
        const [result] = await dbpool.query(querry, [title, description, taskId]);
        return result;
    },

    async deleteTask(taskId) {
        const [result] = await dbpool.query("DELETE FROM tasks WHERE id = ?", [taskId]);
        return result;
    },
    
    async getTeamByName(name) {
    const [rows] = await dbpool.query("SELECT * FROM teams WHERE name = ?", [name]);
    return [rows];
    }

};

module.exports = { Task };
