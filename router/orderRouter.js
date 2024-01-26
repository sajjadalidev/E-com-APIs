import express from "express";
import Order from "./../db/modals/orderModal.js";
import httpStatus from "http-status";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./middleware/index.js";

const orderRouter = express.Router();

// Create Product
orderRouter.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(httpStatus.CREATED).json(savedOrder);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
});

// Get User Orders
// Id is user ID here
orderRouter.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.findOne({ userId: req.params.id });
    res.status(httpStatus.CREATED).json(orders);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
});

// Update
orderRouter.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(httpStatus.CREATED).json(updateOrder);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
});

// Delete Product
orderRouter.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res
      .status(httpStatus.CREATED)
      .json({ message: "Order has been deleted successfully!" });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
});

// Get All Orders
orderRouter.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = Order.find();
    res.status(httpStatus.CREATED).json({
      message: "Orders has been fetched successfully!",
      entitis: orders,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
});

// Get Monthly Income

orderRouter.get("/income", async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(
    date.setMonth(new Date().setMonth(lastmonth.getMonth() - 1))
  );

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(httpStatus.CREATED).json(income);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
});

export default orderRouter;
