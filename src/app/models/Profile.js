import {
  Model, STRING, INTEGER, VIRTUAL,
} from 'sequelize';


import ageConverter from '../functions/ageConverter';

class Profile extends Model {
  static init(sequelize) {
    super.init(
      {
        name: STRING,
        age: INTEGER,
        sex: STRING,
        bio: STRING,
        filename: STRING,
        birth_timestamp: VIRTUAL,
      },
      {
        sequelize,
      },
    );
    this.addHook('beforeSave', async (user) => {
      if (user.birth_timestamp) {
        user.age = ageConverter(user.birth_timestamp);
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User);
  }
}

export default Profile;
