const Task = require('../models/Task');
const Project = require('../models/Project');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    let query;
    
    // Admins get all tasks, members get assigned tasks
    if (req.user.role === 'Admin') {
      // Allow filtering by project id
      if (req.query.projectId) {
        query = Task.find({ projectId: req.query.projectId }).populate('assignedTo', 'name email').populate('projectId', 'title');
      } else {
        query = Task.find().populate('assignedTo', 'name email').populate('projectId', 'title');
      }
    } else {
      if (req.query.projectId) {
         query = Task.find({ assignedTo: req.user.id, projectId: req.query.projectId }).populate('assignedTo', 'name email').populate('projectId', 'title');
      } else {
         query = Task.find({ assignedTo: req.user.id }).populate('assignedTo', 'name email').populate('projectId', 'title');
      }
    }

    const tasks = await query;

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private/Admin
exports.createTask = async (req, res) => {
  try {
    const { projectId, assignedTo } = req.body;

    // Verify project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: `No project with id of ${projectId}` });
    }

    // Check if user is a member of the project
    if (!project.members.includes(assignedTo)) {
      return res.status(400).json({ success: false, message: `Assigned user is not a member of the project` });
    }

    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update task status
// @route   PUT /api/tasks/:id/status
// @access  Private (Admin or assigned member)
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Check permissions
    if (req.user.role !== 'Admin' && task.assignedTo.toString() !== req.user.id) {
       return res.status(403).json({ success: false, message: 'Not authorized to update this task' });
    }

    task.status = status;
    await task.save();

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    await Task.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
