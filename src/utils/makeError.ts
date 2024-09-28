const makeError = (code: number, message: string) => {
	return {
		code,
		message,
	};
};

export default makeError;
