import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const {
    startArrivalDate,
    endArrivalDate,
    startDepartureDate,
    endDepartureDate,
    startInsertedDate,
    endInsertedDate,
  } = req.query;

  const params = new URLSearchParams();

  const filters = {
    "filter[arrival_date][gte]": startArrivalDate,
    "filter[arrival_date][lte]": endArrivalDate,
    "filter[departure_date][gte]": startDepartureDate,
    "filter[departure_date][lte]": endDepartureDate,
    "filter[inserted_at][gte]": startInsertedDate,
    "filter[inserted_at][lte]": endInsertedDate,
  };

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  try {
    const response = await fetch(
      `${process.env.CHANNEX_BASE_URL}/bookings?${params}`,
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
      return res.status(401).json(data);
    }

    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.CHANNEX_BASE_URL}/bookings/${req.params.id}`,
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
