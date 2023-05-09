const express = require("express");
const User = require("../models/user.model");
const uploads = require("../middlewares/uploads");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    res.status(200).json({
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", uploads.single("profile"), async (req, res) => {
  try {
    const user = await User.create({
      first_name: req.body.first_name,
      profile: req.file.path,
    });
    res.status(201).json({
      status: "created",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
