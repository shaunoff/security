const Sequelize = require('sequelize');

const db = require('../_db');

const SavePoint = db.define('savePoint', {
  savePointData: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
});

module.exports = SavePoint;
