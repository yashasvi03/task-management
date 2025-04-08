import express, { Express } from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});


// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Task Management API. Access the tasks at /api/tasks');
});

export default app;
