import type { Request, Response } from "hyper-express";

export type RequestMethod = "get" | "post" | "put" | "delete" | "patch";

export interface BaseRoute {
	route: string;
	method?: RequestMethod;
	run: (req: Request, res: Response) => void;
}

export enum StatusCodes {
	OK = 200,
	CREATED = 201,
	ACCEPTED = 202,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	CONFLICT = 409,
	INTERNAL_SERVER_ERROR = 500
}

export enum ErrorsMessages {
	MISSING_CODE = "Missing auth code parameter",
	INVALID_CODE = "Invalid auth code",
	INTERNAL_SERVER_ERROR = "Internal server error"
}

export enum ErrorsCodes {
	INTERNAL_SERVER_ERROR = 1,
	MISSING_CODE = 1000,
	INVALID_CODE = 1001
}

export interface UserStructure {
	_id: string;
	username: string;
	avatar: string;
}
