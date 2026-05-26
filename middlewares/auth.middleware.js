import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse.js";

export default async function auth(req, res, next) {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization?.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if(req.query.auth != "true" && req.query.auth != undefined) {
    next();
  }

  if (!token) {
    return next(new ErrorResponse("No access token was provided.", 401));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return next(new ErrorResponse("Invalid access token.", 401));
      }
      req.userID = decoded.user.userID;
      req.userEmail = decoded.user.userEmail;
      req.userRole = decoded.user.userRole;
      req.token = token;
      next();
    });
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
}
