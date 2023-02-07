// Load Chance
const Chance = require('chance');

// Instantiate Chance so it can be used
const chance = new Chance();

// default get rarity base on https://yugioh.fandom.com/wiki/Booster_Pack
const superRare = () => {
    const superRare = chance.floating({ min: 1, max: 100, fix: 4 });
    // console.log(superRare, "<====== Super Rare");
    if (superRare <= 16.6667) {
        return true
    } else {
        return false
    }
}
const ultraRare = () => {
    const ultraRare = chance.floating({ min: 1, max: 100, fix: 4 });
    // console.log(ultraRare, "<====== Ultra Rare");
    if (ultraRare <= 7.6923) {
        return true
    } else {
        return false
    }
}
const secretRare = () => {
    const secretRare = chance.floating({ min: 1, max: 100, fix: 4 });
    // console.log(secretRare, "<====== Secret Rare");
    if (secretRare <= 4.1667) {
        return true
    } else {
        return false
    }
}

// console.log(superRare(), ultraRare(), secretRare());

module.exports = {
    superRare,
    ultraRare,
    secretRare
}