"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.MONGODB_URI = void 0;
var env_config_1 = require("./env.config");
Object.defineProperty(exports, "MONGODB_URI", { enumerable: true, get: function () { return __importDefault(env_config_1).default; } });
var db_config_1 = require("./db.config");
Object.defineProperty(exports, "client", { enumerable: true, get: function () { return __importDefault(db_config_1).default; } });
