const express = require("express");

const router = express.Router();

const User = require("../models").User;

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(409).json({
      message: "All fields must be filled in",
    });
  }
  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name, password },
    });
    if (!created) {
      return res.status(409).json({
        message: "Email already in use",
      });
    }

    res.json({
      id: user.id,
    });
    //console.log(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to register user",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
  if (!email || !password) {
    return res.status(409).json({
      message: "Please fill in all fields",
    });
  }

  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(409).json({
        message: "No user with email exists",
      });
    }

    if (password !== user.password) {
      return res.status(409).json({
        message: "Password invalid",
      });
    }
    res.json({
      id: user.id,
    });
    console.log(id);
  } catch (error) {
    res.status(500).json({
      message: "Could not login",
    });
  }
});

module.exports = router;
