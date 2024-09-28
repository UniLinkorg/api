import { glob } from "glob";
import type { Server } from "hyper-express";
import type { BaseRoute } from "../types";

interface Route {
	default: BaseRoute;
}

const loadRoutes = async (server: Server) => {
	const paths = await glob("src/routes/**/*.+(ts|js)");

	for (const path of paths) {
		const { default: routeModule }: Route = await import(`../../${path}`);
		const { route, run, method = "get" } = routeModule;

		server[method](route, run);

		console.debug(`Route (${method}): ${route}`);
	}
};

export default loadRoutes;
