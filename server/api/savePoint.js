const router = require('express').Router();

const { Section, Control, SavePoint } = require('../db/models');

router.get('/create', (req, res, next) => {
  Section.findAll({
    include: [{ all: true }]
  })
    .then(sections => {
			return SavePoint.create({savePointData: JSON.stringify(sections)})
		})
		.then(data => res.json(data))
    .catch(next);
});

router.get('/', (req, res, next) => {
  SavePoint.findAll()
    .then(data => res.json(data))
    .catch(next);
});


module.exports = router;
