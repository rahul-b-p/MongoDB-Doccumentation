"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const constants_1 = require("../constants");
(0, dotenv_1.config)();
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error(constants_1.ERROR.MONGODB_URI_REQUIRED);
}
exports.default = MONGODB_URI;
