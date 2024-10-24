const express = require("express");
const cors = require("cors");
let musicroutes = require("./src/router/getmusic");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5100;

app.get("/", (req, res) => {
  res.send("i am running");
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", musicroutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
