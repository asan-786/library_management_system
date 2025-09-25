const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});



// POST signup
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    req.session.userId = user._id;
    res.redirect("/");
  } catch (error) {
    res.send("Signup failed: " + error.message);
  }
});

// GET login page
router.get("/login", (req, res) => {
  res.render("login");
});

// POST login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.send("Invalid email or password");
  }

  req.session.userId = user._id;
  res.redirect("/");
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;