const express = require("express");
const mongoose = require("mongoose");
const api = require("./server/Routes/api");

mongoose.connect("mongodb://localhost/bank-db", { useNewUrlParser: true });

const PORT = 4000;
const app = express();

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  next();
});
app.use("/", api);

app.listen(PORT, function (err, res) {
  console.log(`server is listen on port ${PORT}`);
});
