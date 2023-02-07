const { default: axios } = require("axios");

//data dummy
// const cards = require('../../YuGiOh-Play-mini-server/db/allCard.json');
const getCardBySets = require("../helpers/getCardBySet");
const { superRare, ultraRare, secretRare } = require("../helpers/randomCard");

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
            const { page } = req.query
            let endpoint
            if (!page) {
                endpoint = `https://db.ygoprodeck.com/api/v7/cardinfo.php`
            } else {
                endpoint = `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=15&offset=${page}`
            }

            const { data } = await axios(endpoint)
            console.log(data.data.length);
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
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
            // console.log(getRarity.common, getRarity.rare, getRarity.super_rare, getRarity.secret_rare);
            // console.log(output.length);

            res.status(200).json(output)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Controller