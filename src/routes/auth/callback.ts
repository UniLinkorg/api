import {
	ErrorsCodes,
	ErrorsMessages,
	StatusCodes,
	type BaseRoute
} from "../../types";
import jwt from "jsonwebtoken";
import makeError from "../../utils/makeError";
import { users } from "../../models/user";

const SEVEN_DAYS_IN_SECONDS = 604800;

const route: BaseRoute = {
	route: "/auth/callback",
	run: async (req, res) => {
		const { code } = req.query_parameters;

		if (!code)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json(makeError(ErrorsCodes.MISSING_CODE));

		const {
			SCOPES,
			REDIRECT_URI,
			CLIENT_SECRET,
			CLIENT_ID,
			JWT_SECRET,
			REDIRECT_AUTH
		} = process.env;

		const body = {
			client_id: <string>CLIENT_ID,
			client_secret: <string>CLIENT_SECRET,
			grant_type: "authorization_code",
			code,
			redirect_uri: <string>REDIRECT_URI,
			scope: JSON.parse(<string>SCOPES).join(" ")
		};

		try {
			const tokenRequest = await fetch(
				"https://discord.com/api/v10/oauth2/token",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					body: new URLSearchParams(body)
				}
			);
			const { access_token, error } = await tokenRequest.json();

			if (error === "invalid_grant")
				return res
					.status(StatusCodes.UNAUTHORIZED)
					.json(makeError(ErrorsCodes.INVALID_CODE));

			const userRequest = await fetch("https://discord.com/api/v10/users/@me", {
				headers: {
					Authorization: `Bearer ${access_token}`
				}
			});

			const { username, id, avatar } = await userRequest.json();

			const token = jwt.sign(
				{ username, _id: id, avatar, oauth_token: access_token },
				<string>JWT_SECRET,
				{
					expiresIn: SEVEN_DAYS_IN_SECONDS
				}
			);

			res.setCookie("user", token, {
				maxAge: SEVEN_DAYS_IN_SECONDS,
				sameSite: "lax",
				httpOnly: false,
				secure: false,
				path: "/"
			});

			await users.updateOne(
				{ _id: id },
				{ username, avatar },
				{ new: true, upsert: true }
			);

			return res.redirect(<string>REDIRECT_AUTH);
		} catch {
			return res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.json(makeError(ErrorsCodes.INTERNAL_SERVER_ERROR));
		}
	}
};

export default route;
