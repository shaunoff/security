const router = require('express').Router();

const { Section, Control } = require('../db/models');

router.get('/', (req, res, next) => {
  Section.findAll({
    include: [Control]
  })
    .then(sections => res.json(sections))
    .catch(next);
});

module.exports = router;
