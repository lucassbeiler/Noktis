import { fn, col } from 'sequelize';
import User from '../models/Choice';

class DislikeController {
  async store(req, res) {
    try {
      const { id } = req.body;

      const loggedUser = await User.findOne({ where: { user_id: req.userId } });

      await loggedUser.update(
        { dislikes: fn('array_append', col('dislikes'), id) },
        { where: { user_id: req.userId } },
      );
    } catch (error) {
      return res.status(400).json({ error: 'Usuário inexistente' });
    }

    return res.status(200).json({ ok: true });
  }
}
export default new DislikeController();
