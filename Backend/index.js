require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const routes = require("./routes/api");
const app = express();

app.use(bodyParser.urlencoded())
app.use(express.json())

mongoose.connect(process.env.MONGOOSE_URL, {useNewUrlParser: true})
    .then(ok => console.log("Connected to db"))
    .catch(err => console.log(err));

app.use("/api", routes);

app.listen(process.env.PORT);