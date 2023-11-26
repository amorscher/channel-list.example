/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Channel } from '@channels/domain';
import express from 'express';
import * as path from 'path';

const app = express();

const producedChannels = process.env.NR_CHANNELS ? parseInt(process.env.NR_CHANNELS) : 1_000;

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to channel-configurator-backend!' });
});

app.get('/api/channels', (req, res) => {

  const channels:Channel[]= [];
  //lets create 100 channels for testing
  for (let index = 0; index < producedChannels; index++) {
    const channel:Channel = {id:index,name:`Name${index}`, description:`desc${index}`,type:"DI"};
    channels.push(channel);
  }
  res.send(channels);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
