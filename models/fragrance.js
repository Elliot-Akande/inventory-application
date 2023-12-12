const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FragranceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
  number_in_stock: { type: Number, min: 0, required: true },
  price: { type: Number, min: 0, required: true },
});

FragranceSchema.virtual("url").get(function () {
  return `/fragrance/${this._id}`;
});

module.exports = mongoose.model("Fragrance", FragranceSchema);
