import { promisify } from 'util';
import { unlink } from 'fs';
import Post from '../models/Post';

class DeletePostController {
  async delete(req, res) {
    try {
      const posts = await Post.findOne({ where: { user_id: req.userId } });

      const unlinkDelete = promisify(unlink);

      posts.post.map((currentElement, index) => {
        if (currentElement.id === req.body.post_id) {
          if (currentElement.image) {
            currentElement.image.map((image) => {
              unlinkDelete(`uploads/${image}`);
              return this;
            });
          }
          posts.post.splice(index, 1);
        }
        return this;
      });

      const { post } = await posts.update({ post: posts.post });

      return res.status(200).json(post);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao remover postagem' });
    }
  }
}

export default new DeletePostController();
