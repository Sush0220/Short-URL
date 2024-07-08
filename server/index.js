import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import urlRoute from "./routes/url.js";
import staticRoute from "./routes/staticRouter.js";
const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
config({ path: path.resolve(__dirname, "../.env") });
const app = express();
const PORT = process.env.PORT;

app.use(cors());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDb connection Established!!"))
  .catch((err) => console.log("mongoDb Error"));

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id"
  );

  res.header(
    "Access-Control-Expose-Headers",
    "x-access-token, x-refresh-token"
  );

  next();
});
app.use("/", urlRoute);
app.use("/", staticRoute);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
