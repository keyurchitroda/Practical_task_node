const express = require("express");
const userRoute = express.Router();
const userController = require("../controller/user.controller");
const { verifyToken,verifyAdmin } = require("../middleware/verifyLogin");

userRoute.post("/add",verifyToken,verifyAdmin, userController.createNewUser);
userRoute.post("/login", userController.login);
userRoute.get("/show", verifyToken, userController.showAllUser);

module.exports = userRoute;
