import express from 'express';
import { Team } from '../models/Team.js';
const router = express.Router();
// GET all teams
router.get('/', async (_req, res) => {
    try {
        const teams = await Team.find().populate('members').populate('createdBy');
        res.json({ message: 'Get all teams', data: teams });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
// GET team by ID
router.get('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('members').populate('createdBy');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({ message: `Get team ${req.params.id}`, data: team });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
});
// POST create new team
router.post('/', async (req, res) => {
    try {
        const newTeam = new Team(req.body);
        const savedTeam = await newTeam.save();
        res.status(201).json({ message: 'Create new team', data: savedTeam });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
});
// PUT update team
router.put('/:id', async (req, res) => {
    try {
        const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTeam) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({ message: `Update team ${req.params.id}`, data: updatedTeam });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update team' });
    }
});
// DELETE team
router.delete('/:id', async (req, res) => {
    try {
        const deletedTeam = await Team.findByIdAndDelete(req.params.id);
        if (!deletedTeam) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({ message: `Delete team ${req.params.id}` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
});
export default router;
