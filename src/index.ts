import { Server } from "hyper-express";
import { config } from "dotenv";
import loadRoutes from "./utils/loadRoutes";
config();

const { PORT = 8080 } = process.env;
const server = new Server();

await loadRoutes(server);

server.listen(<number>PORT, () => {
	console.log(`Running on port ${PORT}`);
});
