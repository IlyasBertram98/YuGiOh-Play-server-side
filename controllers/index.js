const { default: axios } = require("axios");


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
}

module.exports = Controller