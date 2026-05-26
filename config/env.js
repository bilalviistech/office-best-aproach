import dotenv from "dotenv";
dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 4000),
  JWT_SECRET: process.env.JWT_SECRET || "dev_secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "30d",
  MONGODB_URI: process.env.MONGODB_URI,

  SPACES_ENDPOINT: process.env.SPACES_ENDPOINT,
  SPACES_REGION: process.env.SPACES_REGION,
  SPACES_BUCKET: process.env.SPACES_BUCKET,
  SPACES_KEY: process.env.SPACES_KEY,
  SPACES_SECRET: process.env.SPACES_SECRET,
  SPACES_CDN_BASE: process.env.SPACES_CDN_BASE,

  MAX_IMAGES_PER_LISTING: Number(process.env.MAX_IMAGES_PER_LISTING || 8),
  MAX_IMAGE_SIZE_MB: Number(process.env.MAX_IMAGE_SIZE_MB || 8),

  OTP_TTL_SECONDS: Number(process.env.OTP_TTL_SECONDS || 120),
  OTP_MAX_ATTEMPTS: Number(process.env.OTP_MAX_ATTEMPTS || 5),
  OTP_RESEND_LIMIT: Number(process.env.OTP_RESEND_LIMIT || 3),

  LISTING_DEFAULT_EXPIRY_DAYS: Number(process.env.LISTING_DEFAULT_EXPIRY_DAYS || 30)
};
