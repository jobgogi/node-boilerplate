const express = require("express");
const { create } = require("../controllers/userController");
const { createUserValidator } = require("../validator/userValidator");

const route = express.Router();

route.post("/", createUserValidator, create);
route.get("/");

module.exports = route;
