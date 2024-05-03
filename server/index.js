import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import urlRoute from "./routes/url.js";
import staticRoute from "./routes/staticRouter.js";

const app = express();
const PORT = 8000;

app.use(cors());
mongoose
  .connect("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDb connection Established!!"))
  .catch((err) => console.log("mongoDb Error"));

app.use(express.json());
app.use("/", urlRoute);
app.use("/", staticRoute);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
