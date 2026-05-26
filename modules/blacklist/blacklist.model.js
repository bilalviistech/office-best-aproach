import mongoose from "mongoose";

const BlackListSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const BlackList = mongoose.model("BlackList", BlackListSchema);
export default BlackList;
