import { ErrorsCodes, ErrorsMessages } from "../types";

const makeError = (code: number) => {
	const mappedCode = Object.values(ErrorsCodes).find((value) => value === code);
	const message = ErrorsMessages[<number>mappedCode ?? 1];

	return {
		code,
		message
	};
};

export default makeError;
