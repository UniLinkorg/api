import type { MiddlewareNext, Request, Response } from "hyper-express";
import jwt from "jsonwebtoken";
import { ErrorsCodes, StatusCodes, type UserStructure } from "../types";
import makeError from "../utils/makeError";

const jwtMiddleware = async (
	req: Request,
	res: Response,
	next: MiddlewareNext
) => {
	const { authorization: token } = req.headers;
	const { JWT_SECRET } = process.env;

	if (!token)
		return res
			.status(StatusCodes.UNAUTHORIZED)
			.json(makeError(ErrorsCodes.MISSING_TOKEN));

	const jwtCallback: jwt.VerifyCallback = (err, decoded) => {
		if (err)
			return res
				.status(StatusCodes.FORBIDDEN)
				.json(makeError(ErrorsCodes.INVALID_TOKEN));

		req.user = <UserStructure>decoded;

		next();
	};

	jwt.verify(token, <string>JWT_SECRET, jwtCallback);
};

export default jwtMiddleware;
