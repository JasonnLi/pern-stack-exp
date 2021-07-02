import { Server } from "./server";

const server = new Server();

async function startup() {
  await server.listen();
}

const _ = startup();
