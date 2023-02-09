const Controller = require('../controllers');

const router = require('express').Router();





router.get('/', Controller.def)

router.get('/cards', Controller.getAllCards)

router.get('/cardsRandom', Controller.getRandomCards)

router.get('/cardSets', Controller.getAllSets)








router.get('/cardsQuiz', Controller.getOneCardForQuiz)

module.exports = router