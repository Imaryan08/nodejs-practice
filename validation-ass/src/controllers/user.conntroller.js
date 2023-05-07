const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/user.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    res.status(200).json({
      results: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post(
  "/",
  body("first_name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("first name cannot be empty"),
  body("last_name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("last name cannot be empty"),
  body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .custom((val) => {
      const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!val.match(pattern)) throw new Error("Enter email in valid format!");
      return true;
    })
    .custom(async (val) => {
      const email = await User.find({ email: val }).lean().exec();
      console.log(email);
      if (email) throw new Error("Email already exist");

      return true;
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: errors.array(),
        });
      }

      const user = await User.create(req.body);

      res.status(200).json({
        status: "User created",
        user: user,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;
