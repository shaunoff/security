const Sequelize = require('sequelize');

const db = require('../_db');

const Policy = db.define('policy', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Policy;
