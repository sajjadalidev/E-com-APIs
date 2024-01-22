import express, { json } from "express";
import dotenv from "dotenv";
import productRouter from "./router/productsRouter.js";
import categoryRouter from "./router/categoryRouter.js";
import authRouter from "./router/auth.js";
import connectDB from "./db/index.js";
import userRouter from "./router/userRouter.js";

const app = express();

dotenv.config();

app.use(json());

// connect to database
connectDB();
// routes
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/users", authRouter);
app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
