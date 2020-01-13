import jwt from 'jsonwebtoken';
import sequelize from 'sequelize';

import User from '../models/User';
import Profile from '../models/Profile';
import Location from '../models/Location';
import Choice from '../models/Choice';
import Connection from '../models/Connection';
import Post from '../models/Post';

import auth from '../../config/auth';
import checkAge from '../functions/ckeckAge';
import createAccountValidator from '../functions/libs/createAccountValidator';

class UserController {
  async store(req, res) {
    const schema = createAccountValidator;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha de validação' });
    }

    if (!(checkAge(req.body.birth_timestamp))) {
      return res.status(400).json({ error: 'Você é menor de idade!' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'Este usuário já existe!' });
    }

    req.body.name = req.body.name.trim();
    req.body.sex = req.body.sex.toUpperCase();

    if (req.body.sex !== 'F' && req.body.sex !== 'M') {
      return res.status(400).json({ error: 'Falha na validação' });
    }

    if (req.body.sex === 'M') {
      req.body.filename = 'default_avatar_male.jpg';
    } else {
      req.body.filename = 'default_avatar_female.jpg';
    }

    const {
      id, email,
    } = await User.create(req.body);

    const {
      name,
      birth_timestamp,
      sex,
      bio,
      latitude,
      longitude,
    } = req.body;

    await Location.create({ user_id: id, latitude, longitude });
    await Choice.create({ user_id: id });
    await Connection.create({ user_id: id });
    await Post.create({ user_id: id });

    const { age } = await Profile.create({
      user_id: id,
      filename: req.body.filename,
      name,
      birth_timestamp,
      sex,
      bio,
    });

    const user = await User.findOne({ where: { id }, include: ['connections'] });

    const { phone } = req.body;

    const token = jwt.sign({ id }, auth.secret, {
      expiresIn: auth.expiresIn,
    });

    let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

    if (ip.substr(0, 7) === '::ffff:') {
      ip = ip.substr(7);
    }

    const sessions = {
      ip,
      authorization: token,
      phone,
      timestamp: Date.now(),
    };

    await user.connections.update(
      { sessions: sequelize.fn('array_append', sequelize.col('sessions'), JSON.stringify(sessions)) },
      { where: { user_id: id } },
    );

    return res.json({
      user: {
        name,
        age,
        sex,
        bio,
        id,
        filename: req.body.filename,
        latitude,
        longitude,
        email,
      },
      token,
    });
  }
}

export default new UserController();
