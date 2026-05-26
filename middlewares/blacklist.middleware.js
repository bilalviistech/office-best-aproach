import BlackList from "../modules/blacklist/blacklist.model.js";
import ErrorResponse from "../utils/errorResponse.js";

const verifyBlackListToken = async (req, res, next) => {
  const token = req.token;

  const blackListToken = await BlackList.findOne({ token });
  if (blackListToken) {
    throw new ErrorResponse(
      "Your token has been invalidated. Please log in again.",
      403
    );
  }
  next();
};

export default verifyBlackListToken;
