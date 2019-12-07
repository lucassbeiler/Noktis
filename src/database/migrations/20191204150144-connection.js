module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('connections', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    socket: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    expire_token: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
    },
    sessions: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      defaultValue: [],
    },
    await_message: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      defaultValue: [],
    },
    await_matches: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      defaultValue: [],
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('connections'),
};