import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import { notFound } from "./middlewares/notFound.js";
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
  app.use(express.json({ limit: "10mb" }));
  // app.use(morgan("combined"));
  app.use(morgan("dev"));

  app.get("/health", (req, res) => res.json({ ok: true }));

  app.use("/api", routes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
