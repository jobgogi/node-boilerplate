const express = require("express");
const {
  create,
  list,
  getUserById,
  update,
} = require("../controllers/userController");
const {
  createUserValidator,
  getUserByIdValidator,
  updateValidator,
} = require("../validator/userValidator");

const route = express.Router();

route.post("/", createUserValidator, create);
route.get("/", list);
route.get("/:id", getUserByIdValidator, getUserById);
route.put("/:id", updateValidator, update);

module.exports = route;
