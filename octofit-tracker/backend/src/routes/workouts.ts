import express, { Router, Request, Response } from 'express';
import { Workout } from '../models/Workout.js';

const router: Router = express.Router();

// GET all workout suggestions
router.get('/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find().populate('userId');
    res.json({ message: 'Get all workout suggestions', data: workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// GET personalized workout for user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId });
    res.json({ message: `Get workout suggestions for user ${req.params.userId}`, data: workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user workouts' });
  }
});

// POST create new workout suggestion
router.post('/', async (req: Request, res: Response) => {
  try {
    const newWorkout = new Workout(req.body);
    const savedWorkout = await newWorkout.save();
    res.status(201).json({ message: 'Create new workout suggestion', data: savedWorkout });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

// PUT update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ message: `Update workout ${req.params.id}`, data: updatedWorkout });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update workout' });
  }
});

// DELETE workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
    if (!deletedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ message: `Delete workout ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;
