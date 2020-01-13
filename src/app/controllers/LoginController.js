import jwt from 'jsonwebtoken';
import sequelize from 'sequelize';

import User from '../models/User';

import auth from '../../config/auth';
import loginValidator from '../functions/libs/loginValidator';

class LoginController {
  async store(req, res) {
    try {
      const schema = loginValidator;

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Erro de validação' });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ where: { email }, include: ['profiles', 'connections'] });

      if (!user) {
        return res.status(400).json({ error: 'Usuário inexistente' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      const {
        id, profiles,
      } = user;

      const {
        name, age, sex, bio, filename,
      } = profiles;

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
        phone: req.body.phone,
        timestamp: Date.now(),
      };

      await user.connections.update(
        { sessions: sequelize.fn('array_append', sequelize.col('sessions'), JSON.stringify(sessions)) },
        { where: { user_id: id } },
      );

      return res.json({
        user: {
          id,
          name,
          age,
          sex,
          bio,
          filename,
          email,
        },
        token,
      });
    } catch (error) {
      return res.status(400).json({ error: 'Acesso negado' });
    }
  }
}

export default new LoginController();
