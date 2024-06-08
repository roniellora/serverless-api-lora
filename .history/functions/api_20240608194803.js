const express = require("express");
const serverless = require("serverless-http");
const router = require("./routes/author");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const dbCloudUrl = "mongodb+srv://admin:1234@testdb.22mv9ja.mongodb.net/authorDB";

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(dbCloudUrl)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.use("/.netlify/functions/api", router);
module.exports.handler = serverless(app);