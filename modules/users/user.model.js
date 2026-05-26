import mongoose from "mongoose";
import autoIncrementID from "../../config/incPlugin.js";

const UserSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
    },
    name: { type: String },
    // phone: { type: String, unique: true, index: true, required: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },
    role: { type: String, enum: ["user", "dealer", "admin", "moderator"], default: "user" },
    isDealerVerified: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "blocked"], default: "active" },
        password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isSoftDelete: {
      type: Boolean,
      default: false,
    },
    verify: {
      verifyToken: {
        type: String,
      },
      verifyTokenExpiry: {
        type: Date,
      },
      _id: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpiry: {
      type: Date,
    },
    preferences: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Preferences",
    },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.plugin(autoIncrementID, {
  modelName: "User",
  field: "UserId",
  length: 4,
  prefix: "UU",
});

const User = mongoose.model("User", UserSchema);
export default User;
