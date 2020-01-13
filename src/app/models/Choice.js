import {
  Model, ARRAY, INTEGER, STRING,
} from 'sequelize';

class Choice extends Model {
  static init(sequelize) {
    super.init(
      {
        likes: ARRAY(INTEGER),
        dislikes: ARRAY(INTEGER),
        matches: ARRAY(INTEGER),
        age_range: ARRAY(INTEGER),
        max_distance: STRING,
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

export default Choice;
