import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT || 4000;

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:4001';
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:4002';

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'api-gateway' });
});

app.use(createProxyMiddleware({
  pathFilter: '/users',
  target: USER_SERVICE_URL,
  changeOrigin: true,
}));

app.use(createProxyMiddleware({
  pathFilter: '/orders',
  target: ORDER_SERVICE_URL,
  changeOrigin: true,
}));

const server = app.listen(PORT, () => {
  console.log(JSON.stringify({ level: 'info', msg: `api-gateway listening on port ${PORT}` }));
});

function shutdown(signal: string) {
  console.log(JSON.stringify({ level: 'info', msg: `Received ${signal}, shutting down gracefully` }));
  server.close(() => {
    console.log(JSON.stringify({ level: 'info', msg: 'Server closed' }));
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
