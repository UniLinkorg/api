import { connect } from "mongoose";

const mongoConnect = async () => {
    const { MONGOOSE_URL } = process.env;
    
    try {
        await connect(<string>MONGOOSE_URL);

        console.debug("Database connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};

export default mongoConnect;