const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);


const schema = new mongoose.Schema({
  _id: Number,
  fullName: { type: String, require: true },
  age: { type: Number, require: true },
  level: { type: String, require: true },
  address: { type: Object, require: true },
});

// schema.plugin(AutoIncrement, { inc_field: "id" });
mongoose.model("children", schema);
