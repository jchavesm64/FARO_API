import express from "express";

const router = express.Router();

/**
 * Currently not working, may be due to the PMS or Channex.
 */
router.get("/:id/messages", async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.CHANNEX_BASE_URL}/bookings/${req.params.id}/messages`,
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

    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
