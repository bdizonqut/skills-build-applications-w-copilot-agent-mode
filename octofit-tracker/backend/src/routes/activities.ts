import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

// GET all activities
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Get all activities', data: [] });
});

// GET activity by ID
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: `Get activity ${req.params.id}`, data: {} });
});

// POST create new activity
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Create new activity', data: req.body });
});

// PUT update activity
router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: `Update activity ${req.params.id}`, data: req.body });
});

// DELETE activity
router.delete('/:id', (req: Request, res: Response) => {
  res.json({ message: `Delete activity ${req.params.id}` });
});

export default router;
