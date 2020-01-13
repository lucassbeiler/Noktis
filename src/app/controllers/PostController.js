import { randomBytes } from 'crypto';

import Post from '../models/Post';

class PostController {
  async store(req, res) {
    try {
      const user = await Post.findOne({ where: { user_id: req.userId } });

      const post = {
        id: randomBytes(12).toString('hex'),
        date: Date.now(),
      };

      if (req.files && req.body.description) {
        post.image = req.files.map((file) => file.filename);
        post.description = req.body.description;
      } else if (req.files && !req.body.description) {
        post.image = req.files.map((file) => file.filename);
      } else if (!req.files && req.body.description) {
        post.description = req.body.description;
      } else {
        return res.status(400).json({ error: 'Erro ao processar sua publicação' });
      }

      user.post.unshift(post);

      await user.update({ post: user.post });

      return res.status(200).json({ post });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao processar sua publicação' });
    }
  }
}

export default new PostController();
