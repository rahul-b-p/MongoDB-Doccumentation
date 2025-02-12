"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_constat_1 = require("../constants/error.constat");
const log_1 = require("../log");
const db_1 = require("./db");
class Queries {
    /**
     * createCollection
     */
    createCollection(collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCollection = yield db_1.db.createCollection(collectionName);
                if (newCollection)
                    return true;
                else
                    return false;
            }
            catch (error) {
                log_1.logger.error(error);
                throw new Error(error_constat_1.SERVER_ISSUE);
            }
        });
    }
    /**
     * dropCollection
     */
    dropCollection(collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db_1.db.dropCollection(collectionName);
            }
            catch (error) {
                log_1.logger.error(error);
                throw new Error(error_constat_1.SERVER_ISSUE);
            }
        });
    }
    /**
     * insertOne
     */
    insertOneDoccument(collectionName, doccument) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newDoc = yield db_1.db.collection(collectionName).insertOne(doccument);
                return newDoc.insertedId;
            }
            catch (error) {
                log_1.logger.error(error);
                throw new Error(error_constat_1.SERVER_ISSUE);
            }
        });
    }
    /**
     * insertMany
     */
    insertManyDoccuments(collectionName, doccument) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newDocs = yield db_1.db.collection(collectionName).insertMany(doccument);
                return Object.values(newDocs.insertedIds);
            }
            catch (error) {
                log_1.logger.error(error);
                throw new Error(error_constat_1.SERVER_ISSUE);
            }
        });
    }
    /**
     * findAll
     */
    findAllDoccument(collectionName, doc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allDocs = db_1.db.collection(collectionName).find(Object.assign({}, doc));
                return allDocs.toArray();
            }
            catch (error) {
                log_1.logger.error(error);
                throw new Error(error_constat_1.SERVER_ISSUE);
            }
        });
    }
    /**
    * updateOne
    */
    updateOneDocument(collectionName, filter, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.db.collection(collectionName).updateOne(filter, { $set: update });
                return result.modifiedCount > 0;
            }
            catch (error) {
                log_1.logger.error(error);
                throw new Error(error_constat_1.SERVER_ISSUE);
            }
        });
    }
    /**
     * updateMany
     */
    updateManyDocuments(collectionName, filter, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.db.collection(collectionName).updateMany(filter, { $set: update });
                return result.modifiedCount;
            }
            catch (error) {
                log_1.logger.error(error);
                throw new Error(error_constat_1.SERVER_ISSUE);
            }
        });
    }
    /**
     * deleteOne
     */
    deleteOneDocument(collectionName, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.db.collection(collectionName).deleteOne(filter);
                return result.deletedCount > 0;
            }
            catch (error) {
                log_1.logger.error(error);
                throw new Error(error_constat_1.SERVER_ISSUE);
            }
        });
    }
    /**
     * deleteMany
     */
    deleteManyDocuments(collectionName, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield db_1.db.collection(collectionName).deleteMany(filter);
                return result.deletedCount;
            }
            catch (error) {
                log_1.logger.error(error);
                throw new Error(error_constat_1.SERVER_ISSUE);
            }
        });
    }
    /**
     * countDocuments
     */
    countDocuments(collectionName, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db_1.db.collection(collectionName).countDocuments(query);
            }
            catch (error) {
                log_1.logger.error(error);
                throw new Error(error_constat_1.SERVER_ISSUE);
            }
        });
    }
    /**
     * aggregate
     */
    aggregate(collectionName, pipeline) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const aggregation = db_1.db.collection(collectionName).aggregate(pipeline);
                return aggregation.toArray();
            }
            catch (error) {
                log_1.logger.error(error);
                throw new Error(error_constat_1.SERVER_ISSUE);
            }
        });
    }
}
const appQueries = new Queries();
exports.default = appQueries;
