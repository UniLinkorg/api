import type { Request, Response } from "hyper-express";

export type RequestMethod = "get" | "post" | "put" | "delete" | "patch";

export interface BaseRoute {
	route: string;
	method?: RequestMethod;
	protected?: boolean;
	onlyDevs?: boolean;
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
	"Internal server error" = 1,
	"Missing auth code parameter" = 1000,
	"Invalid auth code" = 1001,
	"Missing auth token" = 1002,
	"Invalid auth token" = 1003
}

export enum ErrorsCodes {
	INTERNAL_SERVER_ERROR = 1,
	MISSING_CODE = 1000,
	INVALID_CODE = 1001,
	MISSING_TOKEN = 1002,
	INVALID_TOKEN = 1003
}

export interface UserStructure {
	id: string;
	username: string;
	avatar: string;
}

export interface LinkStructure {
	subdomain: string;
	author: {
		icon?: string;
		name: string;
		description?: string;
	};
	links: {
		url: string;
		label: string;
		group?: string;
		icon?: string;
	};
	groups?: string[];
	background?: string;
}
