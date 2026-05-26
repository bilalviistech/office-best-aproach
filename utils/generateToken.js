import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION || "30d";

  const accessToken = jwt.sign(
    {
      user: {
        userEmail: user.email,
        userID: user._id,
        userRole: user.role,
      },
    },
    process.env.JWT_SECRET,
    {
      expiresIn: accessTokenExpiration,
    }
  );
  return accessToken;
};

export { generateToken };
