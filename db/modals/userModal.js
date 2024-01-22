import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required!",
      minlength: [3, "username must be greater than 3 characters!"],
      maxlength: [32, "username must be between 3-32 characters!"],
    },
    email: {
      type: String,
      trim: true,
      required: "Email is required",
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: "Password is required",
      minlength: [6, "Too short"],
    },
    role: {
      type: String,
      default: "Subscriber",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
      default: [],
    },
    address: { type: String },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
