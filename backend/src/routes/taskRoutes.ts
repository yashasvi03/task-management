import { Router } from 'express';
import * as taskController from '../controllers/taskController';

const router = Router();

// GET all tasks
router.get('/', taskController.getAllTasks);



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
