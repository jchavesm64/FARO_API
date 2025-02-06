import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = await fetch(`${process.env.CHANNEX_BASE_URL}/availability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-api-key": process.env.CHANNEX_API_KEY,
      },
      body: JSON.stringify(req.body),
    }).then((res) => res.json());

    if (data.errors) {
      const statusCodes = {
        bad_request: 400,
        unauthorized: 401,
      };

      const statusCode = statusCodes[data.errors.code] || 400;
      return res.status(statusCode).json(data);
    }

    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
