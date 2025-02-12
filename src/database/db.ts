import { client, DB_NAME } from "../config";


export const db = client.db(DB_NAME);