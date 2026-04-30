const express = require('express');
const {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask
} = require('../controllers/taskController');

const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router
  .route('/')
  .get(protect, getTasks)
  .post(protect, authorize('Admin'), createTask);

router
  .route('/:id/status')
  .put(protect, updateTaskStatus);

router
  .route('/:id')
  .delete(protect, authorize('Admin'), deleteTask);

module.exports = router;
