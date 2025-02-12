import { Document, ObjectId } from "mongodb";
import { SERVER_ISSUE } from "../constants/error.constat";
import { logger } from "../log";
import { db } from "./db";

class Queries {

    /**
     * createCollection
     */
    async createCollection(collectionName: string): Promise<boolean> {
        try {
            const newCollection = await db.createCollection(collectionName);
            if (newCollection) return true;
            else return false;
        } catch (error) {
            logger.error(error);
            throw new Error(SERVER_ISSUE);
        }
    }

    /**
     * dropCollection
     */
    async dropCollection(collectionName: string): Promise<boolean> {
        try {
            return await db.dropCollection(collectionName);
        } catch (error) {
            logger.error(error);
            throw new Error(SERVER_ISSUE);
        }
    }

    /**
     * insertOne
     */
    async insertOneDoccument(collectionName: string, doccument: Record<string, any>): Promise<ObjectId> {
        try {
            const newDoc = await db.collection(collectionName).insertOne(doccument)
            return newDoc.insertedId
        } catch (error) {
            logger.error(error);
            throw new Error(SERVER_ISSUE);
        }
    }

    /**
     * insertMany
     */
    async insertManyDoccuments(collectionName: string, doccument: Record<string, any>[]): Promise<ObjectId[]> {
        try {
            const newDocs = await db.collection(collectionName).insertMany(doccument);
            return Object.values(newDocs.insertedIds);
        } catch (error) {
            logger.error(error);
            throw new Error(SERVER_ISSUE);
        }
    }


    /**
     * findAll
     */
    async findAllDoccument(collectionName: string, doc: Document): Promise<Document[]> {
        try {
            const allDocs = db.collection(collectionName).find({ ...doc });
            return allDocs.toArray()
        } catch (error) {
            logger.error(error);
            throw new Error(SERVER_ISSUE);
        }
    }

    /**
    * updateOne
    */
    async updateOneDocument(collectionName: string, filter: Document, update: Document): Promise<boolean> {
        try {
            const result = await db.collection(collectionName).updateOne(filter, { $set: update });
            return result.modifiedCount > 0;
        } catch (error) {
            logger.error(error);
            throw new Error(SERVER_ISSUE);
        }
    }

    /**
     * updateMany
     */
    async updateManyDocuments(collectionName: string, filter: Document, update: Document): Promise<number> {
        try {
            const result = await db.collection(collectionName).updateMany(filter, { $set: update });
            return result.modifiedCount;
        } catch (error) {
            logger.error(error);
            throw new Error(SERVER_ISSUE);
        }
    }

    /**
     * deleteOne
     */
    async deleteOneDocument(collectionName: string, filter: Document): Promise<boolean> {
        try {
            const result = await db.collection(collectionName).deleteOne(filter);
            return result.deletedCount > 0;
        } catch (error) {
            logger.error(error);
            throw new Error(SERVER_ISSUE);
        }
    }

    /**
     * deleteMany
     */
    async deleteManyDocuments(collectionName: string, filter: Document): Promise<number> {
        try {
            const result = await db.collection(collectionName).deleteMany(filter);
            return result.deletedCount;
        } catch (error) {
            logger.error(error);
            throw new Error(SERVER_ISSUE);
        }
    }

    /**
     * countDocuments
     */
    async countDocuments(collectionName: string, query: Document): Promise<number> {
        try {
            return await db.collection(collectionName).countDocuments(query);
        } catch (error) {
            logger.error(error);
            throw new Error(SERVER_ISSUE);
        }
    }

    /**
     * aggregate
     */
    async aggregate(collectionName: string, pipeline: Document[]): Promise<Document[]> {
        try {
            const aggregation = db.collection(collectionName).aggregate(pipeline);
            return aggregation.toArray();
        } catch (error) {
            logger.error(error);
            throw new Error(SERVER_ISSUE);
        }
    }

}

const appQueries = new Queries();
export default appQueries;