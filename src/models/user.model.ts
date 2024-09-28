import { model, Schema } from "mongoose";
import type { UserStructure } from "../types";

const userSchema = new Schema<UserStructure>(
	{
		_id: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true
		},
		avatar: {
			type: String,
			required: true
		}
	},
	{ versionKey: false }
);

export const users = model("users", userSchema);
