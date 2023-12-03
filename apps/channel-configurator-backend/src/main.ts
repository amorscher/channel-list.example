/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
    Channel,
    SYNC_EVENT,
    createAddChannelSyncAction,
} from '@channels/domain-entities';
import express from 'express';
import * as path from 'path';
import { Server } from 'http';
import socketIO from 'socket.io';
import { logger } from './logger';
import { v4 as uuidv4 } from 'uuid';

export const app = express();

const producedChannels = process.env.NR_CHANNELS
    ? parseInt(process.env.NR_CHANNELS)
    : 1_000;

const server = new Server(app);

const io = new socketIO.Server(server, {
    path: '/api/sync',
});
io.on('connection', (socket: socketIO.Socket) => {
    console.log('a user connected : ' + socket.id);

    socket.on('disconnect', function () {
        console.log('socket disconnected : ' + socket.id);
    });
});

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
            id: uuidv4(),
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

    const channelWithId = {
        ...newChannel,
        id: uuidv4(),
        creationDate: new Date().getTime(),
    };
    logger.info(`Received a `, { payload: req.body });
    io.emit(SYNC_EVENT, createAddChannelSyncAction(channelWithId));
    //we just send it back with a created id
    res.send(channelWithId);
});

const port = process.env.PORT || 3333;

server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
