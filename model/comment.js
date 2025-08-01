const { dbpool } = require('../config/database');

const Comment = {
  async createComment(content, userId, taskId) {
    const query = `
      INSERT INTO comments (content, user_id, task_id)
      VALUES (?, ?, ?)
    `;
    return dbpool.query(query, [content, userId, taskId]);
  },

  async getAllComments() {
    const query = `
      SELECT comments.*, users.username
      FROM comments
      JOIN users ON comments.user_id = users.id
    `;
    return dbpool.query(query);
  },

  async getCommentsByTask(taskId) {
    const query = `
      SELECT comments.*, users.username
      FROM comments
      JOIN users ON comments.user_id = users.id
      WHERE comments.task_id = ?
    `;
    return dbpool.query(query, [taskId]);
  },

  async updateComment(id, content) {
    const query = `
      UPDATE comments
      SET content = ?
      WHERE id = ?
    `;
    return dbpool.query(query, [content, id]);
  },

  async deleteComment(id) {
    const query = `
      DELETE FROM comments
      WHERE id = ?
    `;
    return dbpool.query(query, [id]);
  }
};

module.exports = { Comment };
