import { model, Schema } from "mongoose";
import type { LinkStructure } from "../types";

const linkSchema = new Schema<LinkStructure>(
	{
        subdomain: {
            type: String,
            required: true,
            unique: true
        },
		author: {
			icon: {
				type: String,
				required: false
			},
			name: {
				type: String,
				required: true
			},
			description: {
				type: String,
				required: false
			}
		},
		links: [
			{
				url: {
					type: String,
					required: true
				},
				label: {
					type: String,
					required: true
				},
				group: {
					type: String,
					required: false
				},
				icon: {
					type: Boolean,
					required: false
				}
			}
		],
		groups: {
			type: [String],
			required: false
		},
		background: {
			type: String,
			required: false
		}
	},
	{ versionKey: false }
);

export const users = model("links", linkSchema);
