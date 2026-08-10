import express from 'express';
const router = express.Router();
// GET all users
router.get('/', (_req, res) => {
    res.json({ message: 'Get all users', data: [] });
});
// GET user by ID
router.get('/:id', (req, res) => {
    res.json({ message: `Get user ${req.params.id}`, data: {} });
});
// POST create new user
router.post('/', (req, res) => {
    res.json({ message: 'Create new user', data: req.body });
});
// PUT update user
router.put('/:id', (req, res) => {
    res.json({ message: `Update user ${req.params.id}`, data: req.body });
});
// DELETE user
router.delete('/:id', (req, res) => {
    res.json({ message: `Delete user ${req.params.id}` });
});
export default router;
