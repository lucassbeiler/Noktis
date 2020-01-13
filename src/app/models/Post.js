import { Model, ARRAY, JSON } from 'sequelize';

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        post: ARRAY(JSON),
      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User);
  }
}

export default Post;
