import express, { Express } from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import pool from './db' // ⬅️ Make sure you have this imported

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/tasks', taskRoutes);

// ⬇️ Add this temporary route to initialize DB
app.get('/init-db', async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        due_date TIMESTAMP,
        priority INTEGER,
        status TEXT,
        label TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await pool.query(`
      INSERT INTO tasks (title, due_date, priority, description, status, label, created_at, updated_at) VALUES
      ('My Task', '2025-04-10 00:00:00', 3, 'Test Task 1234', 'DONE', 'LOW', '2025-04-07 12:54:45.053', '2025-04-07 12:56:04.497'),
      ('This is a task created using the Kanban board view', '2025-04-20 00:00:00', 5, 'New Kanban Task', 'DONE', 'MEDIUM', '2025-04-07 13:09:37.964', '2025-04-07 13:11:14.402'),
      ('fsgdfbdg', '2025-04-15 00:00:00', 4, 'Sample Task 2', 'IN_PROGRESS', 'MEDIUM', '2025-04-07 12:55:35.669', '2025-04-07 13:24:48.737'),
      ('fdgrdbr', '2025-04-17 18:56:56', 7, 'Test 5', 'IN_PROGRESS', 'HIGH', '2025-04-07 18:57:14', '2025-04-07 18:57:21'),
      ('fghtr', '2025-04-07 00:00:00', 8, 'New task6', 'IN_PROGRESS', 'MEDIUM', '2025-04-07 13:27:54.188', '2025-04-07 13:28:46.051'),
      ('Test', '2025-04-10 18:23:37', 2, 'Test Task 1', 'TODO', 'MEDIUM', '2025-04-07 18:23:55', '2025-04-07 13:29:03.041'),
      ('opt', '2025-04-08 00:00:00', 9, 'Task 7', 'DONE', 'MEDIUM', '2025-04-08 08:51:20.71', '2025-04-08 08:51:48.608'),
      ('gfdg', '2025-04-12 00:00:00', 10, 'Test on Vercel', 'IN_PROGRESS', 'LOW', '2025-04-08 09:10:52.612', '2025-04-08 09:10:52.612');
    `);

    res.send('✅ Tasks table created and sample data inserted.');
  } catch (err: any) {
    console.error('DB Init Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Task Management API. Access the tasks at /api/tasks');
});

export default app;
