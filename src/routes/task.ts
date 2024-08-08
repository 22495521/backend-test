import express from 'express';
import * as taskController from '@/controllers/task';

const router = express.Router();

router.get('/tasks', taskController.getTask);

router.post('/task', taskController.addTask);

router.delete('/task', taskController.deleteTask);

router.put('/task', taskController.editTask);

export default router;
