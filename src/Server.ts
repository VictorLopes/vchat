import { Server as IOServer } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient, RedisClient } from 'redis';

export default class Server {

  private _io?: IOServer;
  private static _instance?: Server;
  private _pubClient?: RedisClient;
  private _subClient?: RedisClient;

  private constructor() { }

  public static instance() {
    if (!this._instance) this._instance = new Server();
    return this._instance;
  }

  public run() {
    if (!this._io) {
      // starts the socket.io server
      this._io = new IOServer(process?.env?.PORT || 3000, {
        cors: {
          origin: (process?.env?.CORS_ORIGINS && process.env.CORS_ORIGINS) || ['http://127.0.0.1:8080'],
          optionsSuccessStatus: 200
        }
      });

      // initiate Redis
      this._pubClient = createClient({
        host: process?.env?.REDIS_HOST || '127.0.0.1',
        port: process?.env?.REDIS_PORT || 6379,
        prefix: process?.env?.PREFIX || 'vchat'
      });
      this._subClient = this._pubClient.duplicate();

      this._io.adapter(createAdapter(this._pubClient, this._subClient));

      this.initEvents();
    }
    return this._io;
  }

  public get() {
    if (!this._io) {
      this.run();
    }
    return this._io;
  }

  public stop() {
    this._pubClient?.quit();
    this._subClient?.quit();
    this._io?.close();

  }

  private initEvents() {
    // main event trigger when a new socket is connected to the server
    this._io?.on('connection', socket => {

      // a test purpose event to checkout if the server is working fine
      socket.on('ping', () => {
        socket.emit('pong', 'Every thing works fine!');
      });

    });
  }
}