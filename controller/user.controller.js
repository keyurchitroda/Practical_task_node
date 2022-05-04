const db = require("../models");
const { User } = db;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

let userController = {};

userController.createNewUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, dob, role, city, state } =
      req.body;
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !dob ||
      !city ||
      !state
    ) {
      return res
        .status(400)
        .json({ message: "Please add all fields..!", status: 400 });
    }

    const user = await User.findOne({ where: { email: email } });

    if (user) {
      return res.status(400).json({ message: "User already exist..!" });
    } else {
      const hashPassword = bcryptjs.hashSync(password, 10);
      const newuser = await User.create({
        first_name,
        last_name,
        email,
        password: hashPassword,
        dob,
        role,
        city,
        state,
      });
      if (!newuser) {
        return res
          .status(400)
          .json({ message: "Somethin went wrong", status: 400 });
      } else {
        return res
          .status(200)
          .json({ message: "New user successfully created..!", status: 200 });
      }
    }
  } catch (err) {
    console.log("err- createNewUser()", err);
  }
};

userController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please add all fields..!", status: 400 });
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Email is not registered..!", status: 400 });
    } else {
      const comparePassword = await bcryptjs.compareSync(
        password,
        user.password
      );

      if (!comparePassword) {
        return res
          .status(400)
          .json({ message: "Invalid username or password", status: 400 });
      } else {
        const token = jwt.sign({ id: user.id }, "tatvasoft");
        let data = {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
          dob: user.dob,
          city: user.city,
          state: user.state,
          token,
        };

        return res
          .status(200)
          .json({ message: "Login successfully done", data: data });
      }
    }
  } catch (err) {
    console.log("err - Login()", err);
  }
};

userController.showAllUser = async (req, res) => {
  try {
    const user = await User.findAndCountAll({
      attributes: { exclude: ["updatedAt", "createdAt", "password"] },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Something went wrong..!", status: 400 });
    } else {
      return res.status(200).json({
        message: "Users data fecthed successfully..!",
        status: 200,
        data: user,
      });
    }
  } catch (err) {
    console.log("err - showAllUser", err);
  }
};

module.exports = userController;
