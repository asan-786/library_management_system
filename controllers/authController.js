const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signupForm = (req, res) => {
  res.render("signup");
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    await User.create({ email, password: hashed });
    res.redirect("/login");
  } catch (err) {
    res.send("User already exists or error occurred");
  }
};

exports.loginForm = (req, res) => {
  res.render("login");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user._id;
    res.redirect("/");
  } else {
    res.send("Invalid email or password");
  }
};



exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};