"use strict";

// require the express module
const express = require("express");
const org = express.Router();
const fetch = require("node-fetch");

org.get("/organizations/:id", (req, res) => {
  let orgId = req.params.id;

  getToken().then((tokenData) => {
    console.log(tokenData);
    fetch(`https://api.petfinder.com/v2/organizations/${orgId}`, {
      headers: {
        Authorization: tokenData.token_type + " " + tokenData.access_token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        // fetch();
        return res.json(data.organization);
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

module.exports = org;
