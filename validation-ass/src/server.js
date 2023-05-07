const app = require("./index");
const connect = require("./configs/db");
const port = 8080;

app.listen(port, async () => {
  try {
    await connect();
    console.log(`server is running on port : ${port}`);
  } catch (error) {
    console.log(error.message);
  }
});
