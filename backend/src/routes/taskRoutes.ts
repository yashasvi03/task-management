import { Router } from 'express';
import * as taskController from '../controllers/taskController';

const router = Router();

// GET all tasks
// router.get('/', taskController.getAllTasks);


router.get('/', async (req, res) => {
    try {
      const tasks = await taskController.getAllTasks;
      res.json(tasks);
    } catch (err: any) {
      console.error('🔥 GET /api/tasks error:', err.message);  // This shows up in Railway logs
      res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
    }
  });

// GET today's tasks
router.get('/today/tasks', taskController.getTodayTasks);

// GET task by ID
router.get('/:id', taskController.getTaskById);

// CREATE a new task
router.post('/', taskController.createTask);

// UPDATE a task
router.put('/:id', taskController.updateTask);

// DELETE a task
router.delete('/:id', taskController.deleteTask);

export default router;
