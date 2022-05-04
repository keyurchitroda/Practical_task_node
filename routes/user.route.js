const express = require("express");
const userRoute = express.Router();
const userController = require("../controller/user.controller");

userRoute.post("/add", userController.createNewUser);
userRoute.post("/login", userController.login);
userRoute.get("/show", userController.showAllUser);

module.exports = userRoute;
