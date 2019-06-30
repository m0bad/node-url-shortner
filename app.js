const express = require("express");
const bodyParser = require("body-parser");
// const urlRoutes = require("./routes/url");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// app.use("/shortlinks", urlRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
