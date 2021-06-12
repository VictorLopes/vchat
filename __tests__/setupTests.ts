import Server from "../src/Server";
import Client from '../src/Client';

jest.setTimeout(60000);

beforeAll(done => {
  // starts server
  Server.instance().run();

  // starts client
  Client.instance().run({
    onConnect: done
  });
});

afterAll(() => {
  Server.instance().stop();
  Client.instance().stop();
});