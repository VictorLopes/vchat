require('dotenv').config();
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

// starts the socket.io server
const io = new Server(parseInt(process?.env?.PORT) || 3000, {
  cors: {
    origin: JSON.parse(process?.env?.CORS_ORIGINS) || ['http://127.0.0.1:8080'],
    optionsSuccessStatus: 200
  }
});

// initiate Redis
const pubClient = createClient({
  host: process?.env?.REDIS_HOST || '127.0.0.1',
  port: parseInt(process?.env?.REDIS_PORT) || 6379,
  prefix: process?.env?.PREFIX || 'vchat'
});
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));

// socket instances
io.on('connection', socket => {
  // TODO: Implement chat communication
});