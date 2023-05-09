const app = require("./index");
const connect = require("./configs/db");

app.listen(8080, async (req, res) => {
  try {
    await connect();
    console.log("server listening on port 8080");
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
