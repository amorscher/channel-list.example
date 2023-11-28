/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Channel } from '@channels/domain';
import express from 'express';
import * as path from 'path';
import { createLogger, transports, format } from 'winston';

const logger = createLogger({
    // Log only if level is less than (meaning more severe) or equal to this
    level: 'info',
    // Use timestamp and printf to create a standard log format
    format: format.combine(
        format.timestamp(),
        format.printf(
            (info) =>
                `${info.timestamp} ${info.level}: ${info.message} ${
                    info.payload ? JSON.stringify(info.payload) : ''
                }`
        )
    ),
    // Log to the console and a file
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/app.log' }),
    ],
});

export const app = express();

const producedChannels = process.env.NR_CHANNELS
    ? parseInt(process.env.NR_CHANNELS)
    : 1_000;

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());

app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to channel-configurator-backend!' });
});

app.use((req, _res, next) => {
    // Log an info message for each incoming request
    logger.info(`Received a ${req.method} request for ${req.url}`);
    next();
});

app.get('/api/channels', (req, res) => {
    const channels: Channel[] = [];
    //lets create 100 channels for testing
    for (let index = 0; index < producedChannels; index++) {
        const channel: Channel = {
            id: index,
            name: `Name${index}`,
            description: `desc${index}`,
            type: 'DI',
        };
        channels.push(channel);
    }
    res.send(channels);
});

app.post('/api/channels', (req, res) => {
    const newChannel: Channel = req.body as Channel;
    logger.info(`Received a `, { payload: req.body });
    //we just send it back
    res.send(newChannel);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
