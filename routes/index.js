const Controller = require('../controllers');

const router = require('express').Router();





router.get('/', Controller.def)

router.get('/cards', Controller.getAllCards)


module.exports = router