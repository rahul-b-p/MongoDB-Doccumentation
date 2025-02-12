"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const config_1 = require("../config");
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new mongodb_1.MongoClient(config_1.MONGODB_URI, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
exports.default = client;
