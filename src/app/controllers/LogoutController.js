import { fn, col } from 'sequelize';
import Connection from '../models/Connection';

class LogoutController {
  async store(req, res) {
    try {
      const connections = await Connection.findOne({ where: { user_id: req.userId } });

      const [, token] = req.headers.authorization.split(' ');

      await connections.update(
        { expire_token: fn('array_append', col('expire_token'), token) },
        { where: { user_id: connections.user_id } },
      );

      connections.sessions.map((currentElement, index) => {
        if (currentElement.authorization === token) {
          connections.sessions.splice(index, 1);
        }
        return this;
      });

      await connections.update({ sessions: connections.sessions });

      return res.status(200).json({ ok: true });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao desautenticar sessão' });
    }
  }
}

export default new LogoutController();
