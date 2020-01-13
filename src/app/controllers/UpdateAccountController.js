import User from '../models/User';
import updateValidator from '../functions/libs/updateValidator';

class AccontUpdateController {
  async update(req, res) {
    const schema = updateValidator;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro na validação' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findOne({ where: { id: req.userId }, include: ['profiles', 'choices'] });

    if (email) {
      if (email !== user.email) {
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
          return res.status(400).json({ error: 'Este e-mail já está em uso!' });
        }
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json({ error: 'Senha incorreta!' });
    }

    const { name, bio, filename } = await user.profiles.update(req.body);

    const { age_range, max_distance } = await user.choices.update(req.body);

    await user.update(req.body);

    return res.status(200).json({
      name, bio, filename, email, age_range, max_distance,
    });
  }
}

export default new AccontUpdateController();
