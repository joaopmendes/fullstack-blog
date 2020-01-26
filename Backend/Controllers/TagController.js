const Tag = require("../Models/Tag");

module.exports = {
    index: async (req, res) => {
        return res.status(200).json({data: await Tag.find()});
    }
}