const Controller = require('../controllers');

const router = require('express').Router();





router.use('/', Controller.def)




module.exports = router