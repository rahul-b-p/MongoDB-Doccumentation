import { logger } from "./log"
import './config/env.config';
import { runMongoDB } from "./database";
import { port, server } from "./server";


const initializingApp = async () => {
    try {
        await runMongoDB();

        server.listen(port, () => {
            logger.info(`Server Running at http:localhost:${port}`);
        })
    } catch (error: any) {
        logger.error(error.message);
        process.exit(1);
    }
}

initializingApp();