const { Comment } = require('../model/comment');
const Joi = require('joi');

const createComment = async (req, res) => {
  const schema = Joi.object({
    content: Joi.string().min(1).required(),
    userId: Joi.number().required(),
    taskId: Joi.number().required()
  });

  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const result = await Comment.createComment(value.content, value.userId, value.taskId);
    res.status(200).json({ message: "Comment created", data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllComments = async (req, res) => {
  try {
    const [rows] = await Comment.getAllComments();
    res.status(200).json({ comments: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCommentsByTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const [rows] = await Comment.getCommentsByTask(taskId);
    res.status(200).json({ comments: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateComment = async (req, res) => {
  const id = req.params.id;
  const { content } = req.body;

  if (!content) return res.status(400).json({ error: "Content is required" });

  try {
    const result = await Comment.updateComment(id, content);
    res.status(200).json({ message: "Comment updated", data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteComment = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Comment.deleteComment(id);
    res.status(200).json({ message: "Comment deleted", data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createComment,
  getAllComments,
  getCommentsByTask,
  updateComment,
  deleteComment
};
