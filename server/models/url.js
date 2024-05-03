import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const URL = mongoose.model("urls", UrlSchema);
export default URL;
