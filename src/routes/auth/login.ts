import type { BaseRoute } from "../../types";

const route: BaseRoute = {
	route: "/auth/redirect",
	run: async (_, res) => {
		const { DISCORD_URL } = process.env;

		return res.redirect(<string>DISCORD_URL);
	},
};

export default route;
