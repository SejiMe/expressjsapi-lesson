const UserModel = require("./../models/user.model");

const register = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!username) {
      return res.status(402).json({ message: "invalid username" });
    }

    if (!password) {
      return res.status(402).json({ message: "invalid password" });
    }

    if (password.length < 5) {
      return res.status(402).json({ message: "invalid password length" });
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

const signin = (req, res) => {};

const profile = (req, res) => {};

module.exports = { register, signin, profile };
