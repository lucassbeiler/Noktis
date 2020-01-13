import { Model, STRING, VIRTUAL } from 'sequelize';

import { hash, compare } from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: STRING,
        password_hash: STRING,
        password: VIRTUAL,
      },
      {
        sequelize,
      },
    );
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await hash(user.password, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.hasOne(models.Profile, {
      as: 'profiles',
      onDelete: 'CASCADE',
      foreignKey: 'user_id',
    });

    this.hasOne(models.Location, {
      as: 'locations',
      onDelete: 'CASCADE',
      foreignKey: 'user_id',
    });

    this.hasOne(models.Choice, {
      as: 'choices',
      onDelete: 'CASCADE',
      foreignKey: 'user_id',
    });

    this.hasOne(models.Connection, {
      as: 'connections',
      onDelete: 'CASCADE',
      foreignKey: 'user_id',
    });

    this.hasOne(models.Post, {
      as: 'posts',
      onDelete: 'CASCADE',
      foreignKey: 'user_id',
    });
  }

  checkPassword(password) {
    return compare(password, this.password_hash);
  }
}

export default User;
