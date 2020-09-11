"use strict";

// require the express module
const express = require("express");
const routes = express.Router();
const fetch = require("node-fetch");

//TEST
// routes.get("/", (req, res) => {
//   let key = "w5wmnOOaxJ8lyNJxHw7MVeMRuc6tlY7saLzPZPYpLLpT7GqjiD";
//   let secret = "n17jvQb81t1fnhecGvSzr9SfTMz3R5Tr8JkJGe57";
//   let type = "Cat";
//   let status = "adoptable";
//   fetch("https://api.petfinder.com/v2/oauth2/token", {
//     method: "POST",
//     body:
//       "grant_type=client_credentials&client_id=" +
//       key +
//       "&client_secret=" +
//       secret,
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   })
//     .then(function (res) {
//       // Return the response as JSON
//       return res.json();
//     })
//     .then(function (data) {
//       // Log the API data
//       console.log("token", data);

//       // Return a second API call
//       // This one uses the token we received for authentication
//       return fetch(
//         "https://api.petfinder.com/v2/animals?type=" +
//           type +
//           "&status=" +
//           status,
//         {
//           headers: {
//             Authorization: data.token_type + " " + data.access_token,
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         }
//       );
//     })
//     .then(function (res) {
//       // Return the API response as JSON
//       return res.json();
//     })
//     .then(function (data) {
//       // Log the pet data
//       //   console.log("cats", data);
//       res.json(data);
//     })
//     .catch(function (err) {
//       // Log any errors
//       console.log("something went wrong", err);
//     });
// });

// routes.get("/", (req, res) => {
//   getToken().then((tokenData) =>
//     fetch(`https://api.petfinder.com/v2/animals`, {
//       headers: {
//         Authorization: `Bearer ${tokenData.access_token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => fetch())
//   );
// });
// let getToken = () => {
//   let key = "w5wmnOOaxJ8lyNJxHw7MVeMRuc6tlY7saLzPZPYpLLpT7GqjiD";
//   let secret = "n17jvQb81t1fnhecGvSzr9SfTMz3R5Tr8JkJGe57";
//   return fetch("https://api.petfinder.com/v2/oauth2/token", {
//     method: "POST",
//     body:
//       "grant_type=client_credentials&client_id=" +
//       key +
//       "&client_secret=" +
//       secret,
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   }).then((res) => res.json());
// };

//current

// animals/?type=cat&status=adoptable
routes.get("/", (req, res) => {
  getToken().then((tokenData) => {
    console.log(tokenData);
    fetch(`https://api.petfinder.com/v2/animals/?type=cat`, {
      headers: {
        Authorization: tokenData.token_type + " " + tokenData.access_token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        // fetch();
        return res.json(data.animals);//added it to get into animals; one level deeper
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
