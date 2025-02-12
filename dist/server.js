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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.port = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const log_1 = require("./log");
exports.port = process.env.PORT || 3000;
const filePath = path_1.default.join(path_1.default.dirname(__dirname), 'public/index.html');
exports.server = http_1.default.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Serve only the root page
    try {
        if (req.url === '/' || req.url === '/index.html') {
            const data = yield promises_1.default.readFile(filePath);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(constants_1.ERROR.NOT_FOUND);
        }
    }
    catch (error) {
        log_1.logger.error(error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(constants_1.ERROR.SERVER_ISSUE);
    }
}));
