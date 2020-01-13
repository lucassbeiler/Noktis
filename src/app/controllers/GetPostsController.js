import User from '../models/User';
import Post from '../models/Post';
import Profile from '../models/Profile';

class GetPostsController {
  async index(req, res) {
    try {
      const data = await User.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'email', 'password_hash'] },
        include: [{
          model: Post,
          as: 'posts',
          attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'UserId', 'user_id'] },
          where: { user_id: req.params.id },
        },
        {
          model: Profile,
          as: 'profiles',
          attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'UserId', 'user_id'] },
          where: { user_id: req.params.id },
        }],
      });

      const { post: posts } = data.posts;
      const { profiles: profile } = data;

      return res.status(200).json({ profile, posts });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao obter publicações' });
    }
  }
}

export default new GetPostsController();
