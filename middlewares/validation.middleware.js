import validateRequestBody from "../utils/validation.js";
import ErrorResponse from "../utils/errorResponse.js";

function validateBodyMiddleware(excludeKeys = []) {
  return (req, res, next) => {
    const validationResponse = validateRequestBody(req.body, excludeKeys);

    if (!validationResponse.isValid) {
      throw new ErrorResponse(validationResponse.message, 400);
    }

    next();
  };
}

export default validateBodyMiddleware;
