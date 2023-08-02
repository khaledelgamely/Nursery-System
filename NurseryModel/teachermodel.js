const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  // _id: Object,
  fullName: { type: String, require: true },
  password: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  image: { type: String, require: true },
});

mongoose.model("teachers", schema);
