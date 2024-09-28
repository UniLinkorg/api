import { Server } from "hyper-express";
import { config } from "dotenv";
import loadRoutes from "./utils/loadRoutes";
import mongoConnect from "./utils/mongoConnect";
config();

const { PORT = 8080 } = process.env;
const server = new Server();

await loadRoutes(server);
await mongoConnect();

server.listen(<number>PORT, () => {
	console.log(`Running on port ${PORT}`);
});
