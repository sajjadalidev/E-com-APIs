import express from "express";
import Product from "./../db/modals/productModal.js";
import httpStatus from "http-status";
import { verifyTokenAndAdmin } from "./middleware/verifyToken.js";

const productRouter = express.Router();

// Create Product
productRouter.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(httpStatus.CREATED).send(savedProduct);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
  res.status(201).send({ ...req.body, id: "1" });
});

// Get All Products
productRouter.get("/", async (req, res) => {
  const queryNew = req.query.new;
  const queCategory = req.query.category;
  try {
    let products;
    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (queCategory) {
      products = await Product.find({
        categories: {
          $in: [queCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(httpStatus.CREATED).send(products);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
});

// Get Single Product by ID
productRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(httpStatus.CREATED).json(product);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
});

// Update Product
productRouter.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updateProduct = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(httpStatus.CREATED).json(updateProduct);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
});

// Delete Product
productRouter.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res
      .status(httpStatus.CREATED)
      .json({ message: "Product has been deleted successfully!" });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
});

export default productRouter;
