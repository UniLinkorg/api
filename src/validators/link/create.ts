import { object, string, array } from "zod";

const PINTEREST_PATTERN =
	/^https:\/\/i\.pinimg\.com\/(?:[0-9]{3}x[0-9]{3}\/[a-f0-9]{32}\.(?:jpg|jpeg|png|gif))$/;
const SUBDOMAIN_PATTERN = /^[a-z0-9]$/;
const LINK_PATTERN = /\.\S+$/;
const BACKGROUND_HEX_PATTERN = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

const createTeamValidator = object({
	subdomain: string().min(1).max(24).regex(SUBDOMAIN_PATTERN),
	author: object({
		icon: string().regex(PINTEREST_PATTERN).optional(),
		name: string().min(1).max(40),
		description: string().min(10).max(200).optional()
	}),
	links: array(
		object({
			url: string().regex(LINK_PATTERN).max(100),
			label: string().min(1).max(50),
			group: string().min(1).max(100).optional(),
			icon: string().optional()
		})
	).max(20),
	groups: array(string().min(1).max(100)).max(15).optional(),
	background: string().regex(BACKGROUND_HEX_PATTERN).optional()
});

export default createTeamValidator;
