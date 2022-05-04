const express = require("express");
const router = express();
const userRouter = require("./user.route");

router.use("/user", userRouter);

module.exports = router;
