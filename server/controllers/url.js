import { nanoid } from "nanoid";
import URL from "../models/url.js";

async function generateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ message: "URL is required" });
  const shortID = nanoid(8);
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
  });
  return res.json({ id: shortID });
}

async function getShortUrl(req, res) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Id is required" });
    const url = await URL.findOne({ shortId: id });
    if (!url) return res.status(404).json({ message: "URL not found" });
    return res.json({ redirectUrl: url.redirectUrl });
  } catch (error) {
    console.error("Error", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
export { generateNewShortUrl, getShortUrl };
