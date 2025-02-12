"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const config_1 = require("../config");
exports.db = config_1.client.db(config_1.DB_NAME);
