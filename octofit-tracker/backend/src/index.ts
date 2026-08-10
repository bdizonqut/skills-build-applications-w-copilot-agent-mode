import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Codespaces-aware API URL
const getApiUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
  }
  return `http://localhost:${port}`;
};

// Configure CORS to allow Codespaces and localhost (curl/no-origin allowed)
const apiUrl = getApiUrl();
const allowedOrigins = [
  apiUrl,
  `http://localhost:${port}`,
  `http://127.0.0.1:${port}`,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser requests (curl, server-to-server)
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('CORS policy: origin not allowed'));
    },
    credentials: true,
  })
);
app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV || 'development' });
});

// Welcome endpoint
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

// Connect to database and start server
async function startServer() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit Tracker backend listening on port ${port}`);
      console.log(`API URL: ${getApiUrl()}`);
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
}

startServer();
