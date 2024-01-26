import express from "express";
import User from "../db/modals/userModal.js";
import httpStatus from "http-status";
import CryptoJs from "crypto-js";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

// Register new user
authRouter.post("/register", async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Email ID already exists!" });
  }
  const newUser = new User({
    name: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    return res.status(httpStatus.CREATED).json(savedUser);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
});

// Login User
authRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json("Credentials are not correct!");
    }

    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
    if (originalPassword !== req.body.password) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json("Credentials are not correct!");
    }

    const { password, ...others } = user._doc;

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "3d",
      }
    );
    res.status(httpStatus.OK).json({ ...others, accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json("Internal server error");
  }
});

export default authRouter;
