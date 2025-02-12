import fs from 'fs/promises';
import http from 'http';
import path from 'path';
import { ERROR } from './constants'
import { logger } from './log';

export const port = process.env.PORT || 3000;
const filePath = path.join(path.dirname(__dirname), 'public/index.html');

export const server = http.createServer(async (req, res) => {
    // Serve only the root page
    try {
        if (req.url === '/' || req.url === '/index.html') {

            const data = await fs.readFile(filePath);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(ERROR.NOT_FOUND);
        }
    } catch (error) {
        logger.error(error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(ERROR.SERVER_ISSUE);
    }
});