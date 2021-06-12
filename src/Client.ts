import { io as IOClient, Socket } from 'socket.io-client';

export interface IClientEvents {
  onConnect: () => void
}

export default class Client {
  private _io?: Socket;
  private static _instance?: Client;

  private constructor() { }

  public static instance() {
    if (!this._instance) this._instance = new Client();
    return this._instance;
  }

  run(events: IClientEvents) {
    if (!this._io) {
      this._io = IOClient('http://localhost:3000');
      this.initEvents(events)
    }
    return this._io;
  }

  public get(listener?: () => void) {
    if (!this._io) {
      this.run({ onConnect: listener ? listener : () => { } });
    }
    return this._io;
  }

  public stop() {
    this._io?.close();
  }

  private initEvents(events: IClientEvents) {
    this._io?.on('connect', events.onConnect);
  }

}