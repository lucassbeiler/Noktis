import express from 'express';
import http from 'http';
import socket from 'socket.io';
import ioAuth from './app/middlewares/io';
import socketConnection from './app/functions/socketConnection';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);
    this.io = socket(this.server).use(ioAuth);
    this.io.on('connection', socketConnection.bind(this));

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use((req, res, next) => {
      req.io = this.io;
      return next();
    });
    this.app.use('/uploads', express.static('uploads'));
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().server;
