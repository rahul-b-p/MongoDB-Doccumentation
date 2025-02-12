import { logger } from "./log"
import './config/env.config';
import { runMongoDB } from "./database";


const initializingApp = async () => {
    try {
        await runMongoDB();
    } catch (error: any) {
        logger.error(error.message);
        process.exit(1);
    }
}


initializingApp();