const Sequelize = require('sequelize');

const db = require('../_db');

const Section = db.define('section', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Section;
