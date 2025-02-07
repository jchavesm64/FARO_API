import express from "express";

const router = express.Router();

router.get("/options", async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.CHANNEX_BASE_URL}/properties/options`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-api-key": process.env.CHANNEX_API_KEY,
        },
      }
    );
    const data = await response.json();

    if (data.errors) {
      return res.status(400).json({ error: data.errors });
    }

    return res.json(data);
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 401) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
