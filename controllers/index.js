

class Controller  {
    static async def(req, res, next) {
        try {
            res.status(200).json({msg:"Masuk gan!"})
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Controller