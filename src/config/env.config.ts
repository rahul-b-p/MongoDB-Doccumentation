import { config } from "dotenv";
import { ERROR } from "../constants";

config();

const requiredEnvVariables: string[] = [
    'MONGODB_URI',
    'DB_NAME'
];

// Throwing application error, to exist from process when env variables are not assigned
requiredEnvVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
        throw new Error(ERROR.ENV_REQUIRED);
    }
});


export const MONGODB_URI = process.env.MONGODB_URI as string;
export const DB_NAME = process.env.DB_NAME as string;