import type { Request, Response } from "hyper-express";

export type RequestMethod = "get" | "post" | "put" | "delete" | "patch";

export type RouteFn = (req: Request, res: Response) => void;

export interface BaseRoute {
	route: string;
	method?: RequestMethod;
	run: RouteFn;
}

export interface StatusCodes {
	OK: 200;
	CREATED: 201;
	ACCEPTED: 202;
	NO_CONTENT: 204;
	BAD_REQUEST: 400;
	UNAUTHORIZED: 401;
	FORBIDDEN: 403;
	NOT_FOUND: 404;
	METHOD_NOT_ALLOWED: 405;
	CONFLICT: 409;
	INTERNAL_SERVER_ERROR: 500;
}