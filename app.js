"use strict";

const express       = require("express");
const hbs           = require("express-handlebars");
const bodyParser    = require("body-parser");
const path          = require("path");

const app  = express();
const port = process.env.PORT || 8000;

// View engine.
app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// parsing of json data
app.use(bodyParser.json());

// parsing of form data
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/", require("./routes/products.js"));

//Errors
app.use((request, response) => response.status(404).render("404"));

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).render("500");
});

// Start
app.listen(port, () => console.log(`Express app listening on port ${port}!`));
