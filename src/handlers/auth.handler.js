const UserModel = require("./../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../helpers/config");

const register = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!username) {
      return res.status(422).json({ message: "invalid username" });
    }

    if (!password) {
      return res.status(422).json({ message: "invalid password" });
    }

    if (password.length < 5) {
      return res.status(422).json({ message: "invalid password length" });
    }

    const user = await UserModel.create({
      username,
      password,
    });

    res.json({ user: { username, _id: user._id } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const signin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
      return res.status(422).json({ message: "invalid username" });
    }

    if (!password) {
      return res.status(422).json({ message: "invalid password" });
    }

    if (password.length < 5) {
      return res.status(422).json({ message: "invalid password length" });
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isMatchPassword = await user.comparePassword(password);

    if (!isMatchPassword) {
      return res.status(401).json({ message: "password does not match" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
      },
      config.secret
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const profile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await UserModel.findById(userId);

    res.json({ user: { username: user.username, _id: user._id } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, signin, profile };
