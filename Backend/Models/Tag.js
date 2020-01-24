const db = require("mongoose");

const tagScheema = new db.Schema({
    name: {type: String, required: true},
});

module.exports = db.model("tag", tagScheema);

