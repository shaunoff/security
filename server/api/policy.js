const router = require('express').Router();

const { Policy } = require('../db/models');

router.get('/', (req, res, next) => {
  Policy.findAll()
    .then(policies => res.json(policies))
    .catch(next);
});



module.exports = router;
