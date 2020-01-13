import Profile from '../models/Profile';

class FileController {
  async store(req, res) {
    try {
      const user = await Profile.findOne({ where: { user_id: req.userId } });

      const { filename } = req.file;

      await user.update({ filename });

      return res.status(200).json({ filename });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao processar arquivo' });
    }
  }
}
export default new FileController();
