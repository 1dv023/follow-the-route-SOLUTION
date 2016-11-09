"use strict";

const router = require("express").Router();

let products = [{id: 1, title: "Phone"}];

router.route("/products/")
    .get((request, response) => {
        response.render("products/index", {products: products});
    });

router.route("/products/create")
    .get((request, response) => {
        response.render("products/create");
    })
    .post((request, response) => {
        let data = {
            id: products.length + 1,
            title: request.body.title
        };

        products.push(data);

        response.redirect("/products/");
    });

router.route("/products/:id")
    .get((request, response) => {
        response.render("products/product", {id: request.params.id});
    });

module.exports = router;