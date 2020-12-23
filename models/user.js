const { model, Schema } = require("mongoose");
const { ObjectId } = Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "subscriber",
  },
  cart: {
    type: Array,
    default: [],
  },
  address: {
    type: String,
  },
  //wishlist: [{ type: ObjectId, ref: "Product" }],
}, {timestamps: true});

module.exports = model("User", userSchema);
