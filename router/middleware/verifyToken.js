import httpStatus from "http-status";
import jwt from "jsonwebtoken";

// Middleware
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split("")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err)
        res.status(httpStatus.UNAUTHORIZED).json("You are not authorized!");
      req.user = user;
      next();
    });
  } else {
    return res.status(httpStatus.UNAUTHORIZED).json("You are not authorized!");
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  console.log("🚀 ~ verifyTokenAndAuthorization ~ req:", req);
  verifyToken(req, res, () => {
    console.log("🚀 ~ verifyToken ~ req:", req.user);

    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed! Only Admin can access this.");
    }
  });
};
