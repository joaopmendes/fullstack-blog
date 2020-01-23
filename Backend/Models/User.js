const db = require("mongoose");

const userSchema = new db.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    accessToken: {type: String, default: ""}
    // posts: []
});

module.exports = db.model("User", userSchema);