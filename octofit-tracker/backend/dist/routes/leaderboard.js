import express from 'express';
const router = express.Router();
// GET leaderboard
router.get('/', (_req, res) => {
    res.json({ message: 'Get leaderboard', data: [] });
});
// GET leaderboard by team ID
router.get('/team/:teamId', (req, res) => {
    res.json({ message: `Get leaderboard for team ${req.params.teamId}`, data: [] });
});
// POST reset leaderboard (admin)
router.post('/reset', (_req, res) => {
    res.json({ message: 'Leaderboard reset' });
});
export default router;
