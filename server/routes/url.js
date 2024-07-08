import express from "express";
import { generateNewShortUrl, getShortUrl } from "../controllers/url.js";
const router = express.Router();
router.post("/post_url", generateNewShortUrl);
router.get("/get_url/:id", getShortUrl);

export default router;
