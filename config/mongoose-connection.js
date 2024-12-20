const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/VZ")
  .then(function () {
    console.log("Connected");
  })
  .catch(function (err) {
    console.log(err);
  })

module.exports = mongoose.connection;