import mongoose from "mongoose";
import dotenv from "dotenv";
import { getString } from "../utils/env/env.js";
dotenv.config();

let connection;

const connectDB = async () => {
  const connString = getString(
    "MONGO_URI",
    "mongodb://localhost:27017/"
  );
  try {
    mongoose.set("strictQuery", false);
    mongoose.set("strictPopulate", false);
    connection = await mongoose.connect(connString);
    console.log(
      `📦 MongoDB connected: ${connection.connection.host}` +
      " " +
      connection.connection.name
    );
  } catch (error) {
    console.error("Mongo-DB connection failed.");
    console.error(error);
    process.exit(1);
  }
};

export { connectDB, connection };
