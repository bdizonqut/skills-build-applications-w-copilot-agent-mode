import express from 'express';
const router = express.Router();
// GET all teams
router.get('/', (_req, res) => {
    res.json({ message: 'Get all teams', data: [] });
});
// GET team by ID
router.get('/:id', (req, res) => {
    res.json({ message: `Get team ${req.params.id}`, data: {} });
});
// POST create new team
router.post('/', (req, res) => {
    res.json({ message: 'Create new team', data: req.body });
});
// PUT update team
router.put('/:id', (req, res) => {
    res.json({ message: `Update team ${req.params.id}`, data: req.body });
});
// DELETE team
router.delete('/:id', (req, res) => {
    res.json({ message: `Delete team ${req.params.id}` });
});
export default router;
