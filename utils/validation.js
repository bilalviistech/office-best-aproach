const validateRequestBody = (reqBody, excludeKeys = []) => {
  for (let key in reqBody) {
    if (!excludeKeys.includes(key)) {
      if (reqBody[key] === null || reqBody[key] === undefined) {
        return {
          isValid: false,
          message: `${key} is required and cannot be null or undefined`,
        };
      }
    }
  }

  return { isValid: true };
};

export default validateRequestBody;
