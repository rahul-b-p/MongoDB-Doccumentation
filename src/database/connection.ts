import { client } from "../config";
import { LOG } from "../constants";
import { logger } from "../log";



export const runMongoDB = async () => {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        logger.info(LOG.MONGODB_CONNECTION_SUCCESS);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}