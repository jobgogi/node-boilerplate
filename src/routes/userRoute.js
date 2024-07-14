const express = require("express");
const {
  create,
  list,
  getUserById,
  update,
  remove,
} = require("../controllers/userController");
const {
  createUserValidator,
  getUserByIdValidator,
  updateValidator,
  removeValidator,
} = require("../validator/userValidator");

const route = express.Router();

route.post("/", createUserValidator, create);
route.get("/", list);
route.get("/:id", getUserByIdValidator, getUserById);
route.put("/:id", updateValidator, update);
route.delete("/:id", removeValidator, remove);

module.exports = route;
