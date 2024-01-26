import httpStatus from "http-status";
import jwt from "jsonwebtoken";

// Middleware
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: "You are not authorized!" });
      }
      req.user = user;
      next();
    });
  } else {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "You are not authorized!" });
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed! Only Admin can access this.");
    }
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed! Only Admin can access this.");
    }
  });
};
