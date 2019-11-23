import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionConstroller {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validacão' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(403).json({ error: 'Senha incorreta' });
    }

    const {
      id, name, age, sex, bio, filename, latitude, longitude,
    } = user;

    return res.json({
      user: {
        id,
        name,
        age,
        sex,
        bio,
        filename,
        latitude,
        longitude,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionConstroller();
