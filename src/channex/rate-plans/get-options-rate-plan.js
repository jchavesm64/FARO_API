import express from "express";

const router = express.Router();

router.get("/options", async (req, res) => {
  const { propertyId } = req.query;
  const params = new URLSearchParams();

  const filters = {
    "filter[property_id]": propertyId,
  };

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  try {
    const response = await fetch(
      `${process.env.CHANNEX_BASE_URL}/rate_plans/options?${params}`,
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