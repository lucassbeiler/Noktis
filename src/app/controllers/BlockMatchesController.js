import Choice from '../models/Choice';

class BlockMatchesController {
  async store(req, res) {
    try {
      const user = await Choice.findOne({ where: { user_id: req.userId } });

      const blockedUser = await Choice.findOne({ where: { user_id: req.body.block } });

      const whereBlockUser = user.matches.indexOf(req.body.block);

      user.matches.splice(whereBlockUser, 1);

      await user.update({ matches: user.matches });

      if (blockedUser.matches.includes(user.user_id)) {
        const whereUser = blockedUser.matches.indexOf(user.user_id);

        blockedUser.matches.splice(whereUser, 1);

        await blockedUser.update({ matches: blockedUser.matches });
      }

      return res.status(200).json({ ok: 'Usuário bloqueado!' });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao bloquear usuário' });
    }
  }
}
export default new BlockMatchesController();
