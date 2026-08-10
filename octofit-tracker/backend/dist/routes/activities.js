import express from 'express';
const router = express.Router();
// GET all activities
router.get('/', (_req, res) => {
    res.json({ message: 'Get all activities', data: [] });
});
// GET activity by ID
router.get('/:id', (req, res) => {
    res.json({ message: `Get activity ${req.params.id}`, data: {} });
});
// POST create new activity
router.post('/', (req, res) => {
    res.json({ message: 'Create new activity', data: req.body });
});
// PUT update activity
router.put('/:id', (req, res) => {
    res.json({ message: `Update activity ${req.params.id}`, data: req.body });
});
// DELETE activity
router.delete('/:id', (req, res) => {
    res.json({ message: `Delete activity ${req.params.id}` });
});
export default router;
