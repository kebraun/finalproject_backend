"use strict";

// require the express module
const express = require("express");
const routes = express.Router();
const fetch = require("node-fetch");

// animals/?type=cat&status=adoptable
routes.get("/petfinder/:id", (req, res) => {
  let animalId = req.params.id;

  getToken().then((tokenData) => {
    console.log(tokenData);
    fetch(`https://api.petfinder.com/v2/animals/${animalId}`, {
      headers: {
        Authorization: tokenData.token_type + " " + tokenData.access_token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        // console.log(data);
        // fetch();
        return res.json(data.animal); //added it to get into animals; one level deeper
      });
  });
});

routes.get("/petfinder", (req, res) => {
  let breed = req.query.breed;

  getToken().then((tokenData) => {
    console.log(tokenData);
    fetch(`https://api.petfinder.com/v2/animals/?type=cat&breed=${breed}`, {
      headers: {
        Authorization: tokenData.token_type + " " + tokenData.access_token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        // console.log(data);
        // fetch();
        return res.json(data.animals); //added it to get into animals; one level deeper
      });
  });
});

let getToken = () => {
  let key = "w5wmnOOaxJ8lyNJxHw7MVeMRuc6tlY7saLzPZPYpLLpT7GqjiD";
  let secret = "n17jvQb81t1fnhecGvSzr9SfTMz3R5Tr8JkJGe57";
  return fetch(`https://api.petfinder.com/v2/oauth2/token`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "grant_type=client_credentials&client_id=" +
      key +
      "&client_secret=" +
      secret,
    method: "POST",
  }).then((res) => res.json());
};

module.exports = routes;
