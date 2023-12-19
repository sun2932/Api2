const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  mobile: Number,
  slot: String,
  password: String,
  payment:Boolean,
});

module.exports = userSchema;
