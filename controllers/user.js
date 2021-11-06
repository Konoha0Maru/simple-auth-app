const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const User = require("../models/User");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const userObj = { username, email, role: "user" };
    const hashedPwd = await hash(password, 12);
    userObj.password = hashedPwd;
    const user = await new User(userObj).save();
    const token = sign({ user }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res
      .status(201)
      .json({ token, user: { ...user._doc, password: null } });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).lean();
    if (!user) return res.status(404).send("Invalid credentials");
    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");
    const token = sign({ user }, process.env.JWT_SECRET, { expiresIn: 360000 });
    return res.status(200).json({ token, user: { ...user, password: null } });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getAuthUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).lean();
    if (!user)
      return res.status(400).send("User not found, Authorization denied..");
    return res.status(200).json({ ...user, password: null });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
