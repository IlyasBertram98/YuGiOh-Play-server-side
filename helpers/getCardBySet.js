const chance = require('chance').Chance();
const devide = require("./stringDivider")

const getCardBySets = (cards, sets, rarity, totalGet) => {
    //so i make dataTemp to push the 20 right data to here
    const temp = []

    //somehow it return 12342 bunch of null and 20 data
    const dataCards = cards.data.map(el1 => {
        let isSets = false
        if (el1.card_sets) {
            el1.card_sets.forEach(el2 => {
                if (sets === devide(el2.set_code) && el2.set_rarity === rarity) {
                    isSets = true
                }
            })
        }

        if (isSets === true && el1) {
            temp.push(el1) 
        }
    })


    const result = []

    for (let i = 0; i < totalGet; i++) {
        result.push(temp[chance.integer({ min: 0, max: temp.length - 1 })])
    }


    return result
}

module.exports = getCardBySets;