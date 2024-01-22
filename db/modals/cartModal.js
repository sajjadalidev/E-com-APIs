import { Schema, model } from "mongoose";
const CartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    producsts: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = model("Cart", CartSchema);

export default Cart;
