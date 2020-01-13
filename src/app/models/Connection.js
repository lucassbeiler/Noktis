import {
  Model, STRING, ARRAY, JSON,
} from 'sequelize';

class Connection extends Model {
  static init(sequelize) {
    super.init(
      {
        socket: STRING,
        expire_token: ARRAY(STRING),
        sessions: ARRAY(JSON),
        await_message: ARRAY(JSON),
        await_matches: ARRAY(JSON),
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

export default Connection;
