const db = require("../models");
const { User } = db;
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const { x_auth_token } = req.headers;
  if (!x_auth_token) {
    return res
      .status(400)
      .json({ message: "Token not available..!", status: 400 });
  }

  jwt.verify(x_auth_token, "tatvasoft", async (err, payload) => {
    if (err) {
      return res
        .status(200)
        .json({ message: "Token is not valid..!", status: 400 });
    }

    let { id } = payload;
    let user = await User.findOne({ where: { id } });
    req.user = user;
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  let { role } = req.user;
  if (role == "admin") {
    next();
  } else {
    return res.status(400).json({
      message: "You have no permission to add new user..!",
      status: 400,
    });
  }
};

module.exports = { verifyToken, verifyAdmin };
