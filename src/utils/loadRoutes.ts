import { glob } from "glob";
import type { Server } from "hyper-express";
import type { BaseRoute } from "../types";
import jwtMiddleware from "../middlewares/jwt";
import devMiddleware from "../middlewares/dev";

interface Route {
	default: BaseRoute;
}
const paths = await glob("src/routes/**/*.+(ts|js)");

const loadRoutes = async (server: Server) => {
	for (const path of paths) {
		const { default: routeModule }: Route = await import(`../../${path}`);
		const {
			route,
			run,
			method = "get",
			protected: isProtected = false,
			onlyDevs = false
		} = routeModule;

		if (isProtected) {
			server[method](route, jwtMiddleware, run);
		} else if (onlyDevs) {
			server[method](route, devMiddleware, run);
		} else {
			server[method](route, run);
		}

		console.debug(`Route (${method}): ${route}`);
	}
};

export default loadRoutes;
