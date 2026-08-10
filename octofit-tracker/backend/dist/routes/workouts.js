import express from 'express';
const router = express.Router();
// GET all workout suggestions
router.get('/', (_req, res) => {
    res.json({ message: 'Get all workout suggestions', data: [] });
});
// GET personalized workout for user
router.get('/user/:userId', (req, res) => {
    res.json({ message: `Get workout suggestions for user ${req.params.userId}`, data: {} });
});
// POST create new workout suggestion
router.post('/', (req, res) => {
    res.json({ message: 'Create new workout suggestion', data: req.body });
});
// PUT update workout
router.put('/:id', (req, res) => {
    res.json({ message: `Update workout ${req.params.id}`, data: req.body });
});
// DELETE workout
router.delete('/:id', (req, res) => {
    res.json({ message: `Delete workout ${req.params.id}` });
});
export default router;
