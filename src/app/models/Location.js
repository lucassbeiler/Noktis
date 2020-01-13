import { Model, DOUBLE, STRING } from 'sequelize';

class Location extends Model {
  static init(sequelize) {
    super.init(
      {
        latitude: DOUBLE,
        longitude: DOUBLE,
        address: STRING,
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

export default Location;
