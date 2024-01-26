import express, { json } from "express";
import dotenv from "dotenv";
import productRouter from "./router/productsRouter.js";
import categoryRouter from "./router/categoryRouter.js";
import authRouter from "./router/auth.js";
import connectDB from "./db/index.js";
import userRouter from "./router/userRouter.js";
import cartRouter from "./router/orderRouter.js";
import orderRouter from "./router/orderRouter.js";
import stripeRouter from "./router/stripe.js";
import cors from "cors";

const app = express();

dotenv.config();

app.use(json());
app.use(cors());
// connect to database
connectDB();
// routes
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/users", authRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/stripe", stripeRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
