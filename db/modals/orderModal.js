import { Schema, model } from "mongoose";
const OrderSchema = new Schema(
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
        amount: { type: String, required: true },
        address: { type: Object, required: true },
        status: { type: String, default: "pending" },
      },
    ],
  },
  { timestamps: true }
);

const Order = model("Order", OrderSchema);

export default Order;
