const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema({
  _id: Number,
  name: { type: String, require: true },
  supervisor: { type: String, require: true, ref: "teachers" },
  children: { type: Array, require: true, unique: true, ref: "children" },
});

// schema.plugin(AutoIncrement, { incerment_field: "id" });

mongoose.model("class", schema);
