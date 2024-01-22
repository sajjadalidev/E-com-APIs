import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [3, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: "Description is required",
      minlength: [3, "Too short"],
      maxlength: [2000, "Too long"],
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: [32, "Too long"],
    },
    category: {
      type: Schema.ObjectId,
      ref: "Category",
    },
    subs: [
      {
        type: Schema.ObjectId,
        ref: "Sub",
      },
    ],
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
      enum: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    },
    ratings: [
      {
        star: Number,
        postedBy: {
          type: Schema.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
