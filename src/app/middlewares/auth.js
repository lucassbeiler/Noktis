import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/User';

import auth from '../../config/auth';

export default async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).json({ error: 'you did not enter any token' });
    }

    const [, token] = authHeader.split(' ');

    const decoded = await promisify(jwt.verify)(token, auth.secret);

    req.userId = decoded.id;

    const user = await User.findOne({ where: { id: req.userId }, include: ['connections'] });

    if (user.connections.expire_token.includes(token)) {
      return res.status(403).json({ error: 'user is not logged in' });
    }

    return next();
  } catch (error) {
    return res.status(403).json({ error: 'invalid token' });
  }
};
