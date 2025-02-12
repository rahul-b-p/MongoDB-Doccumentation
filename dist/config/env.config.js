"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_NAME = exports.MONGODB_URI = void 0;
const dotenv_1 = require("dotenv");
const constants_1 = require("../constants");
(0, dotenv_1.config)();
const requiredEnvVariables = [
    'MONGODB_URI',
    'DB_NAME'
];
// Throwing application error, to exist from process when env variables are not assigned
requiredEnvVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
        throw new Error(constants_1.ERROR.ENV_REQUIRED);
    }
});
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.DB_NAME = process.env.DB_NAME;
