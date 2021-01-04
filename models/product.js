const { model, Schema } = require("mongoose");
const { ObjectId } = Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 32,
      text: true,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: 32,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: [{ type: ObjectId, ref: "Sub" }],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: ["Black", "Brown", "Silver", "White", "Blue"],
    },
    brand: {
      type: String,
      enum: ["Apple", "Microsoft", "Samsung", "Lenovo", "Asus"],
    },
    // ratings: [
    //   {
    //     type: Number,
    //     postedBy: { type: ObjectId, ref: "User" },
    //   },
    // ],
  },
  { timestamps: true }
);

module.exports = model("Product", productSchema);
