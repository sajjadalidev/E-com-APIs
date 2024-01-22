import express from "express";
import Category from "../db/modals/categoryModal.js";
import httpStatus from "http-status";

const categoryRouter = express.Router();

// get all categories
categoryRouter.get("/", async (req, res) => {
  const allCategories = await Category.find();
  return res.status(httpStatus.OK).send(allCategories);
});

// Create Category
categoryRouter.post("/", async (req, res) => {
  const category = await Category.create({ ...req.body });
  return res.status(httpStatus.CREATED).send(category);
});

// Update Category
categoryRouter.put("/:id", (req, res) => {
  res.status(200).send({ ...req.body, id: req.params.id });
});

// Delete Category
categoryRouter.delete("/:id", (req, res) => {
  res.status(200).send("Category deleted", req.params.id);
});

export default categoryRouter;
