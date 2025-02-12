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
const log_1 = require("./log");
require("./config/env.config");
const database_1 = require("./database");
const server_1 = require("./server");
const initializingApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.runMongoDB)();
        server_1.server.listen(server_1.port, () => {
            log_1.logger.info(`Server Running at http:localhost:${server_1.port}`);
        });
    }
    catch (error) {
        log_1.logger.error(error.message);
        process.exit(1);
    }
});
initializingApp();
