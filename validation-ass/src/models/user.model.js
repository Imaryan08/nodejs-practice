const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
    unique: true,
  },
  pincode: {
    type: Number,
    required: true,
    min: 100000,
    maxLength: 999999,
  },
  age: { type: Number, required: true, min: 1, max: 100 },
  gender: { type: String, required: true, enum: ["Male", "Female", "Others"] },
});


module.exports = mongoose.model('user', userSchema);

