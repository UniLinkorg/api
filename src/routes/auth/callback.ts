import {
	ErrorsCodes,
	ErrorsMessages,
	StatusCodes,
	type BaseRoute,
} from "../../types";
import * as jwt from "jsonwebtoken";
import makeError from "../../utils/makeError";

const SEVEN_DAYS_IN_SECONDS = 604800;

const route: BaseRoute = {
	route: "/auth/callback",
	run: async (req, res) => {
		const { code } = req.query_parameters;

		if (!code)
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json(makeError(ErrorsCodes.MISSING_CODE, ErrorsMessages.MISSING_CODE));

		const {
			SCOPES,
			REDIRECT_URI,
			CLIENT_SECRET,
			CLIENT_ID,
			AUTH_LINK,
			JWT_SECRET,
			REDIRECT_AUTH,
		} = process.env;

		const body = {
			client_id: <string>CLIENT_ID,
			client_secret: <string>CLIENT_SECRET,
			grant_type: "authorization_code",
			code,
			redirect_uri: <string>REDIRECT_URI,
			scope: JSON.parse(<string>SCOPES).join(" "),
		};

		const tokenRequest = await fetch(
			"https://discord.com/api/v10/oauth2/token",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams(body),
			},
		);
		const { access_token, error } = await tokenRequest.json();

		if (error === "invalid_grant")
			return res
				.status(StatusCodes.UNAUTHORIZED)
				.json(makeError(ErrorsCodes.INVALID_CODE, ErrorsMessages.INVALID_CODE));

		const userRequest = await fetch("https://discord.com/api/v10/users/@me", {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		const { username, id, avatar } = await userRequest.json();

		const token = jwt.sign(
			{ username, id, avatar, oauth_token: access_token },
			<string>JWT_SECRET,
			{
				expiresIn: SEVEN_DAYS_IN_SECONDS,
			},
		);

		res.setCookie("user", token, {
			maxAge: SEVEN_DAYS_IN_SECONDS,
			sameSite: "lax",
			httpOnly: false,
			secure: false,
			path: "/",
		});

		return res.redirect(<string>REDIRECT_AUTH);
	},
};

export default route;
