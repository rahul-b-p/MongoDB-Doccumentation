import { config } from "dotenv";
import { ERROR } from "../constants";

config();
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(ERROR.MONGODB_URI_REQUIRED);
}

export default MONGODB_URI as string; 