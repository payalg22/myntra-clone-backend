const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT= process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mongoose.connect(process.env.MONGOOSE_URI_STRING, () => {
    console.log("Connected to database");
  });
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
});
