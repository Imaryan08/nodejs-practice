const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).json({
      route: req.baseUrl,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
