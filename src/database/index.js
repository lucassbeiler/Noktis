import Sequelize from 'sequelize';

import User from '../app/models/User';
import Profile from '../app/models/Profile';
import Location from '../app/models/Location';
import Choice from '../app/models/Choice';
import Connection from '../app/models/Connection';
import Post from '../app/models/Post';

import db from '../config/database';

const models = [User, Profile, Location, Choice, Connection, Post];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(db);

    models.map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
