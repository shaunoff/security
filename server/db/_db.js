const Sequelize = require('sequelize');

//const databaseURI = 'postgres://localhost:5432/auth';
const databaseURI = DATABASE_URL
const db = new Sequelize(databaseURI, {
  define: {
    underscored: true
  },
  logging: false
});

module.exports = db;
