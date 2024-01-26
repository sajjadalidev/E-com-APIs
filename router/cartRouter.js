import express from "express";
import Cart from "./../db/modals/cartModal.js";
import httpStatus from "http-status";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./middleware/index.js";

const cartRouter = express.Router();

// Create Product
cartRouter.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(httpStatus.CREATED).send(savedCart);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
  res.status(201).send({ ...req.body, id: "1" });
});

// Get User Cart
// Id is user ID here
cartRouter.get("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(httpStatus.CREATED).json(cart);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
});

// Update
cartRouter.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(httpStatus.CREATED).json(updateCart);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
});

// Delete Product
cartRouter.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res
      .status(httpStatus.CREATED)
      .json({ message: "Cart has been deleted successfully!" });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
});

// Get All Cart
cartRouter.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const cart = Cart.find();
    res
      .status(httpStatus.CREATED)
      .json({ message: "Cart has been fetched successfully!", entitis: cart });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
});

export default cartRouter;
