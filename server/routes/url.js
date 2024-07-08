import express from "express";
import { generateNewShortUrl } from "../controllers/url.js";
const router = express.Router();
router.post("/post_url", generateNewShortUrl);

export default router;
