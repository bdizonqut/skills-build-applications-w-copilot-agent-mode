import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
const app = express();
const port = Number(process.env.PORT) || 8000;
// Codespaces-aware API URL
const getApiUrl = () => {
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
    }
    return `http://localhost:${port}`;
};
app.use(cors());
app.use(express.json());
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', environment: process.env.NODE_ENV || 'development' });
});
app.get('/', (_req, res) => {
    res.json({
        message: 'Welcome to the OctoFit Tracker API',
        apiUrl: getApiUrl(),
        version: '1.0.0'
    });
});
// API Routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
app.listen(port, () => {
    console.log(`OctoFit Tracker backend listening on port ${port}`);
    console.log(`API URL: ${getApiUrl()}`);
});
