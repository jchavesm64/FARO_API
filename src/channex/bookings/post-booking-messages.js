import express from "express";

const router = express.Router();

/**
 * Currently not working, may be due to the PMS or Channex.
 */
router.post("/:id/messages", async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.CHANNEX_BASE_URL}/bookings/${req.params.id}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-api-key": process.env.CHANNEX_API_KEY,
        },
        body: JSON.stringify(req.body),
      }
    );
    const data = await response.json();

    if (data.errors) {
      const statusCodes = {
        unauthorized: 401,
        resource_not_found: 404,
        validation_error: 422,
      };

      const statusCode = statusCodes[data.errors.code] || 400;
      return res.status(statusCode).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
