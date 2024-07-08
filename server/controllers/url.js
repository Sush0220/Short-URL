import { nanoid } from "nanoid";
import URL from "../models/url.js";

async function generateNewShortUrl(req, res) {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ message: "URL is required" });
    let urlEntry = await URL.findOne({ redirectUrl: url });
    if (urlEntry) {
      return res.status(200).json({ shortId: urlEntry.shortId });
    } else {
      const shortID = nanoid(8);
      urlEntry = new URL({
        shortId: shortID,
        redirectUrl: url,
      });
      await urlEntry.save();
      return res.status(201).json({ shortID });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// async function getShortUrl(req, res) {
//   try {
//     const { id } = req.params;
//     if (!id) return res.status(400).json({ message: "Id is required" });
//     const url = await URL.findOne({ shortId: id });
//     if (!url) return res.status(404).json({ message: "URL not found" });
//     return res.json({ redirectUrl: url.redirectUrl });
//   } catch (error) {
//     console.error("Error", error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// }
export { generateNewShortUrl };
