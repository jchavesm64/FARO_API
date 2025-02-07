import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await fetch(`${process.env.CHANNEX_BASE_URL}/groups`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "user-api-key": process.env.CHANNEX_API_KEY,
      },
    });
    const data = await response.json();
    if (data.errors) {
      return res.status(401).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.CHANNEX_BASE_URL}/groups/${req.params.id}`,
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
      const statusCodes = {
        unauthorized: 401,
        resource_not_found: 404,
      };

      const statusCode = statusCodes[data.errors.code] || 400;
      return res.status(statusCode).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

export default router;
