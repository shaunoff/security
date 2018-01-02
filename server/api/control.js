const router = require('express').Router();

const { Section, Control,db, Policy } = require('../db/models');

router.get('/', (req, res, next) => {
  Control.findAll({
    include: [{all: true}]
  })
    .then(controls => res.json(controls))
    .catch(next);
});

router.put('/:controlId', (req, res) => {
	const {controlId} = req.params;
	Control.update(req.body, {where: {id: controlId}, returning: true})
	.then(data => {
    return Control.findOne({where: {id: controlId}, include: [{all: true}]})
  })
  .then(control => res.json(control))
});

router.put('/evidence/:controlId', (req, res) => {
	const {controlId} = req.params;
  const control = Control.findOne({where: {id: controlId}})
    .then(control => control.addPolicy(req.body.policyId))
    .then(data => {
      return Control.findOne({where: {id: controlId}, include: [{all: true}]})
    })
    .then(control => res.json(control))

});

module.exports = router;
