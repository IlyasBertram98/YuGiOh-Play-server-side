const { default: axios } = require("axios");
const { Question } = require('../models')
//data dummy
const cards = require('../../YuGiOh-Play-mini-server/db/allCard.json');
const sets = require('../../YuGiOh-Play-mini-server/db/AllCardSet.json')
const getCardBySets = require("../helpers/getCardBySet");
const { superRare, ultraRare, secretRare } = require("../helpers/randomCard");

const chance = require('chance').Chance();


class Controller  {
    static async def(req, res, next) {
        try {
            res.status(200).json({msg:"Masuk gan!"})
        } catch (error) {
            console.log(error);
        }
    }

    static async getAllCards(req, res, next) {
        try {
            const { page, fname } = req.query
            let option = ''
            if (fname) {
                option = option + `&fname=${fname}`
            }
            // if (race) {
            //     option = option + `&race=${race}`
            // }
            // console.log(option);
            let endpoint
            if (!page) {
                endpoint = `https://db.ygoprodeck.com/api/v7/cardinfo.php`
            } else if (page && !option) {
                endpoint = `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=7&offset=${page}`
            } else if (page && option) {
                endpoint = `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=7&offset=${page}${option}`
            }
            console.log(endpoint);
            const { data } = await axios(endpoint)
            console.log(data.data.length);
            res.status(200).json(data)
        } catch (error) {
            console.log(error.code);
        }
    }

    static async getRandomCards(req, res, next) {
        try {
            const { sets } = req.query
            
            
            const { data } = await axios(`https://db.ygoprodeck.com/api/v7/cardinfo.php`)
            
            const output = []
            // default get rarity base on https://yugioh.fandom.com/wiki/Booster_Pack
            const getRarity = {
                common: 7,
                rare: 1,
                super_rare: 0,
                ultra_rare: 0,
                secret_rare: 0
            }

            const isSuperRare = superRare()
            const isUltraRare = ultraRare()
            const isSecretRare = secretRare()

            // checking if there is rarity more than rare, if exist push to output
            if (!isSuperRare && !isUltraRare && !isSecretRare) {
                ++getRarity.common
            }
            if (isSuperRare) {
                ++getRarity.super_rare
                const dataSuperRare = getCardBySets(data, sets, "Super Rare", getRarity.super_rare)
                output.push(dataSuperRare[0])
                // console.log(dataSuperRare.length)
            }
            if (isUltraRare) {
                ++getRarity.ultra_rare
                const dataUltraRare = getCardBySets(data, sets, "Ultra Rare", getRarity.ultra_rare)
                output.push(dataUltraRare[0])
                // console.log(dataUltraRare.length)
            }
            if (isSecretRare) {
                ++getRarity.secret_rare
                const dataSecretRare = getCardBySets(data, sets, "Secret Rare", getRarity.secret_rare)
                output.push(dataSecretRare[0])
                // console.log(dataSecretRare.length)
            }         
                   
            // checking if there is rarity more than rare, if not only get rare and common
            const dataRare = getCardBySets(data, sets, "Rare", getRarity.rare)
            output.push(dataRare[0])   
            const dataCommon = getCardBySets(data, sets, "Common", getRarity.common)
            dataCommon.forEach(el => {
                output.push(el)
            })
            // console.log(dataRare.length)
            // console.log(dataCommon.length)
            console.log(getRarity.common, getRarity.rare, getRarity.super_rare, getRarity.secret_rare);
            console.log(output.length);

            res.status(200).json(output)
        } catch (error) {
            console.log(error.code);
        }
    }

    static async getOneCardForQuiz(req, res, next) {
        try {

            const dataQuestion = await Question.findAll()
            const dataQuestionMerge = []

            const { data } =  await axios(`https://db.ygoprodeck.com/api/v7/cardinfo.php`)
            
            dataQuestion.forEach(el => {
                const pushData = {
                    cardId: el.cardId,
                    cardName: el.cardName,
                    question:  el.question,
                    firstClue: el.firstClue,
                    secondClue: el.secondClue,
                    image_url: ''
                }

                data.data.forEach(el2 => {
                    if (el.cardId === el2.id) {
                        pushData.image_url = el2.card_images[0].image_url;
                    }
                })
                dataQuestionMerge.push(pushData)
            })

            res.status(200).json(dataQuestionMerge)
        } catch (error) {
            console.log(error.code);
        }
    }

    static async getAllSets(req, res, next) {
        try {
            const {data} = await axios(`https://db.ygoprodeck.com/api/v7/cardsets.php`)

            res.status(200).json(data)
        } catch (error) {
            console.log(error.code);
        }
    }
}

module.exports = Controller