require("dotenv").config(); //process.env.____
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const device = require("express-device");
const authRoutes = require("./routes/auth");
const urlRoutes = require("./routes/url");
const indexRoute = require("./routes");
const errorHandler = require("./controllers/errorHandler");
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(device.capture());

app.use("/auth", authRoutes);
app.use("/shortlinks/:username", urlRoutes);
app.use("/:slug", indexRoute);

app.use((req, res, next) => {
  let err = new Error("Page Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
