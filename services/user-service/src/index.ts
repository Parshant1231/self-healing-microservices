import express from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4001;

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
];

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'user-service' });
});

app.get('/users', (_req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

const server = app.listen(PORT, () => {
  console.log(JSON.stringify({ level: 'info', msg: `user-service listening on port ${PORT}` }));
});

function shutdown(signal: string) {
  console.log(JSON.stringify({ level: 'info', msg: `Received ${signal}, shutting down gracefully` }));
  server.close(() => {
    console.log(JSON.stringify({ level: 'info', msg: 'Server closed' }));
    process.exit(0);
  });
  setTimeout(() => {
    console.error(JSON.stringify({ level: 'error', msg: 'Forced shutdown after timeout' }));
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
