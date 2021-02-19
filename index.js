const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


//Configs
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/agendamento", {useNewUrlParser: true, useUnifiedTopology: true});
//END Configs


//Routes
app.get("/", (req, res) => {
    res.send("Oi!");
});

app.get("/cadastro", (req, res) => {
    res.render("create");
})
//END Routes


app.listen(8080, () => {});