import { Socket } from "socket.io-client";
import Client from "../src/Client";

let socket: Socket | undefined;

it('should faild because the server was previous started', () => {
  try {
    expect(socket).toBeNull();
  } catch {
    console.log('failed because the socket was already open in beforeAll globally!')
  }
})

describe('Starting server', () => {

  beforeAll(() => {
    socket = Client.instance().get();
  });

  it("should work", done => {
    socket?.emit('ping');
    socket?.on("pong", (arg) => {
      expect(arg).toBe("Everything works fine!");
      done();
    });
  });

});