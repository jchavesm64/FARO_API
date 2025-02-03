import express from "express";

const router = express.Router();

router.post("/:group_id/properties/:property_id", async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.CHANNEX_BASE_URL}/groups/${req.params.group_id}/properties/${req.params.property_id}`,
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
        bad_request: 400,
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
