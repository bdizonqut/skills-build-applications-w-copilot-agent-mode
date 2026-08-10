import express from 'express';
import { Leaderboard } from '../models/Leaderboard.js';
const router = express.Router();
// GET leaderboard
router.get('/', async (_req, res) => {
    try {
        const leaderboard = await Leaderboard.find()
            .populate('userId')
            .populate('teamId')
            .sort({ rank: 1 });
        res.json({ message: 'Get leaderboard', data: leaderboard });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
// GET leaderboard by team ID
router.get('/team/:teamId', async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find({ teamId: req.params.teamId })
            .populate('userId')
            .sort({ rank: 1 });
        res.json({ message: `Get leaderboard for team ${req.params.teamId}`, data: leaderboard });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
// POST reset leaderboard (admin)
router.post('/reset', async (_req, res) => {
    try {
        await Leaderboard.updateMany({}, { totalCalories: 0, totalActivities: 0, totalDistance: 0, rank: 0 });
        res.json({ message: 'Leaderboard reset' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to reset leaderboard' });
    }
});
export default router;
