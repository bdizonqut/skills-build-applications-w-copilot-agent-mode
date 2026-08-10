import express from 'express';
import { User } from '../models/User.js';
const router = express.Router();
// GET all users
router.get('/', async (_req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({ message: 'Get all users', data: users });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: `Get user ${req.params.id}`, data: user });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
// POST create new user
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'Create new user', data: savedUser });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});
// PUT update user
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: `Update user ${req.params.id}`, data: updatedUser });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update user' });
    }
});
// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: `Delete user ${req.params.id}` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});
export default router;
