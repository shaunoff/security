const db = require('../_db');

const Story = require('./story');
const User = require('./user');
const Section = require('./section');
const Control = require('./control');
const Policy = require('./policy');
const SavePoint = require('./savePoint');

User.hasMany(Story, {
  foreignKey: 'author_id',
  onDelete: 'cascade', // remove all associated stories
  hooks: true // makes the cascade actually work. Yay Sequelize!
});

Story.belongsTo(User, {as: 'author'});

Section.hasMany(Control)

Control.belongsTo(Section)

Control.belongsToMany(Policy, {through: 'evidence'})
Policy.belongsToMany(Control, {through: 'evidence'})

module.exports = {
	db,
	Story,
	User,
  Section,
  Control,
  Policy,
  SavePoint
};
