import bcrypt from "bcryptjs";
import User from "../users/user.model.js";
import ErrorResponse from "../../utils/errorResponse.js";
import { generateToken } from "../../utils/generateToken.js";
import crypto from "crypto";
import { decrypt, encrypt } from "../../utils/encryption.js";
import BlackList from "../blacklist/blacklist.model.js";

export async function register(data, session) {
  const { email, password } = data;
  const exists = await User.findOne({ email });
  if (exists) {
    throw new ErrorResponse("Email already in use.", 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const verifyToken = crypto.randomBytes(20).toString("hex");
  const verifyTokenExpiry = Date.now() + 10 * 60 * 1000;
  const body = {
    ...data,
    password: passwordHash,
    isVerified: false,
    verify: {
      verifyToken: verifyToken,
      verifyTokenExpiry: verifyTokenExpiry,
    },
  };

  const user = await User.create([body], { session })
  const token = generateToken(user[0]);

  const encryptedEmail = encrypt(user[0].email, "xyz");
  const verifyUrl = `http://localhost:3000/verify-otp?token=${verifyToken}&e=${encryptedEmail}`;

  return {
    user: { id: user[0]._id, name: user[0].name, email: user[0].email, verifyUrl },
    token,
  };
};

export async function verifyEmail(data, session) {
  const { encryptedEmail, token } = data;

  const decryptedEmail = await decrypt(encryptedEmail, "xyz");
  const user = await User.findOne({
    email: decryptedEmail,
    "verify.verifyToken": token,
    "verify.verifyTokenExpiry": { $gt: Date.now() },
  });

  if (!user) {
    throw new ErrorResponse("Invalid or expired link. Please try again !", 400);
  }

  user.isVerified = true;
  user.verify = undefined;
  await user.save({ session });

  return {
    message: "Email successfully verified. Please login to continue !",
  };
};

export async function login({ email, password }) {

  const user = await User.findOne({ email }).lean();
  if (!user) {
    throw new ErrorResponse("Invalid credentials.", 401);
  }

  if (!user.isVerified) {
    throw new ErrorResponse("Please verify the email.", 400);
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    throw new ErrorResponse("Invalid credentials.", 401);
  }

  const token = generateToken(user);
  return {
    user: { id: user._id, name: user.name, email: user.email },
    token,
  };
};

export async function logout(token) {
  await BlackList.create({ token });
  return {
    message: "Logout successfully."
  };
};

export async function getUser(userID) {
  const user = await User.findById(userID).select("-password").lean();
  if (!user) {
    throw new ErrorResponse("User not found.", 404);
  }
  return { user };
};