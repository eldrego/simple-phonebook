import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// import path from 'path';
import util from 'util';

import database from './config/database';
import routes from './routes';

require('dotenv').config();

const debug = util.debuglog('server');
const port = process.env.PORT || 9090;

const app = express();
app.server = http.createServer(app);

app.use(cors());

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(`${__dirname}/../client/dist`));
// app.use(express.static(`${__dirname}/./public`));

app.use('/api/v1/', routes);

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to My Nodejs Application API' });
});

app.server.listen(port);

debug('\x1b[33m%s\x1b[0m', `Started on port ${port}`);

module.exports = app;
