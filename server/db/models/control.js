const Sequelize = require('sequelize');

const db = require('../_db');

const Control = db.define('control', {
  controlNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  sectionIndex: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  controlType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  controlFamily: {
    type: Sequelize.STRING,
    allowNull: false
  },
  controlText: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  controlResult: {
    type: Sequelize.TEXT,
  },
  responsibleParty: {
    type: Sequelize.STRING,
  },
  nistMapping: {
    type: Sequelize.STRING,
  },
  isoMapping: {
    type: Sequelize.STRING,
  },
  cisCritical: {
    type: Sequelize.STRING,
  },
  dfarsCovered: {
    type: Sequelize.STRING,
  },
  internalNotes: {
    type: Sequelize.TEXT,
  },
  complete: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: "inProgress"
  }
});

module.exports = Control;
