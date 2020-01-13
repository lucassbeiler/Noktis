import { verify } from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/User';

import { secret } from '../../config/auth';

export default async (socket, next) => {
  try {
    if (!(socket.handshake.query.token)) {
      return next(new Error('you did not enter any token'));
    }

    const decoded = await promisify(verify)(socket.handshake.query.token, secret);

    socket.userId = decoded.id;

    const user = await User.findOne({ where: { id: socket.userId }, include: ['connections'] });

    if (user.connections.expire_token.includes(socket.handshake.query.token)) {
      return next(new Error('user is not logged in'));
    }

    return next();
  } catch (error) {
    return next(new Error('invalid token'));
  }
};
