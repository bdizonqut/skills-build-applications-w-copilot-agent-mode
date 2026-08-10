import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

// GET leaderboard
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Get leaderboard', data: [] });
});

// GET leaderboard by team ID
router.get('/team/:teamId', (req: Request, res: Response) => {
  res.json({ message: `Get leaderboard for team ${req.params.teamId}`, data: [] });
});

// POST reset leaderboard (admin)
router.post('/reset', (_req: Request, res: Response) => {
  res.json({ message: 'Leaderboard reset' });
});

export default router;
