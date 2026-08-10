import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

// GET all teams
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Get all teams', data: [] });
});

// GET team by ID
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: `Get team ${req.params.id}`, data: {} });
});

// POST create new team
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Create new team', data: req.body });
});

// PUT update team
router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: `Update team ${req.params.id}`, data: req.body });
});

// DELETE team
router.delete('/:id', (req: Request, res: Response) => {
  res.json({ message: `Delete team ${req.params.id}` });
});

export default router;
