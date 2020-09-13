"use strict";

const express = require("express");

const routes = express.Router();
const pool = require("./connection");

routes.get("/visitors", (req, res) => {
	let queryString = `SELECT * FROM visitor`;
	pool.query(queryString).then((response) => {
		res.json(response.rows);
	});
});
routes.get("/favorites/:id", (req, res) => {
	let vId = req.params.id;
	let queryString = `SELECT * FROM favorites where visitor_id = ${vId}`;
	console.log(queryString);
	pool.query(queryString).then((response) => {
		res.json(response.rows);
	});
});

routes.post("/visitors", (req, res) => {
	let body = req.body;
	let queryString = `INSERT INTO visitor (visitor_email, visitor_password, visitor_fname, visitor_lname) 
                        VALUES ($1::VARCHAR, $2::VARCHAR, $3::VARCHAR, $4::VARCHAR) RETURNING *`;
	pool
		.query(queryString, [
			body.visitor_email,
			body.visitor_password,
			body.visitor_fname,
			body.visitor_lname,
		])
		.then((response) => {
			res.json(response.rows);
		});
});

// adding the favorties
routes.post("/favorites", (req, res) => {
	let body = req.body;
	let queryString = `INSERT INTO favorites (visitor_id, favorite_cats) 
                        VALUES ($1::INT, $2::INT[])`;
	pool
		.query(queryString, [body.visitor_id, body.favorite_cats])
		.then((response) => {
			res.json(body);
		});
});

// Update the favorites
routes.put("/favorites/:id", (req, res) => {
	let id = req.params.id;
	let body = req.body;
	let queryString = `UPDATE favorites SET favorite_cats= $1::INT[] 
    WHERE visitor_id = ${id}`;
	pool.query(queryString, [body.favorite_cats]).then((response) => {
		res.json(body);
	});
});

module.exports = routes;
