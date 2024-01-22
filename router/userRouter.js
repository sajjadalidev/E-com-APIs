import express from "express";
import User from "../db/modals/userModal.js";
import httpStatus from "http-status";
import CryptoJs from "crypto-js";
import { verifyTokenAndAuthorization } from "./middleware/verifyToken.js";

const userRouter = express.Router();

userRouter.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString();
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(httpStatus.CREATED).json(updateUser);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
});

export default userRouter;
