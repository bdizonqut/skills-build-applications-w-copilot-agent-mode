import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

// GET all users
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Get all users', data: [] });
});

// GET user by ID
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: `Get user ${req.params.id}`, data: {} });
});

// POST create new user
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Create new user', data: req.body });
});

// PUT update user
router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: `Update user ${req.params.id}`, data: req.body });
});

// DELETE user
router.delete('/:id', (req: Request, res: Response) => {
  res.json({ message: `Delete user ${req.params.id}` });
});

export default router;
