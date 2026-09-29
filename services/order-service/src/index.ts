import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4002;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:4001';

interface Order {
  id: string;
  userId: string;
  item: string;
  quantity: number;
}

const orders: Order[] = [];
let nextId = 1;

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'order-service' });
});

app.get('/orders', (_req, res) => {
  res.json(orders);
});

app.post('/orders', async (req, res) => {
  const { userId, item, quantity } = req.body;

  if (!userId || !item || !quantity) {
    return res.status(400).json({ error: 'userId, item, and quantity are required' });
  }

  try {
    await axios.get(`${USER_SERVICE_URL}/users/${userId}`, { timeout: 3000 });
  } catch (err: any) {
    if (err.response?.status === 404) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.error(JSON.stringify({ level: 'error', msg: 'user-service call failed', error: err.message }));
    return res.status(503).json({ error: 'user-service unavailable, try again later' });
  }

  const order: Order = { id: String(nextId++), userId, item, quantity };
  orders.push(order);
  res.status(201).json(order);
});

const server = app.listen(PORT, () => {
  console.log(JSON.stringify({ level: 'info', msg: `order-service listening on port ${PORT}` }));
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
