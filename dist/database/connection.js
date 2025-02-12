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
exports.runMongoDB = void 0;
const config_1 = require("../config");
const constants_1 = require("../constants");
const log_1 = require("../log");
const runMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        yield config_1.client.connect();
        // Send a ping to confirm a successful connection
        yield config_1.client.db("admin").command({ ping: 1 });
        log_1.logger.info(constants_1.LOG.MONGODB_CONNECTION_SUCCESS);
    }
    finally {
        // Ensures that the client will close when you finish/error
        yield config_1.client.close();
    }
});
exports.runMongoDB = runMongoDB;
