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

router.post("/", async (req, res) => {
  try {
    const response = await fetch(`${process.env.CHANNEX_BASE_URL}/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-api-key": process.env.CHANNEX_API_KEY,
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();

    if (data.errors) {
      const statusCodes = {
        unauthorized: 401,
        validation_error: 422,
      };

      const statusCode = statusCodes[data.errors.code] || 400;
      return res.status(statusCode).json(data);
    }

    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

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

router.put("/:id", async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.CHANNEX_BASE_URL}/groups/${req.params.id}`,
      {
        method: "PUT",
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

router.delete("/:group_id/properties/:property_id", async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.CHANNEX_BASE_URL}/groups/${req.params.group_id}/properties/${req.params.property_id}`,
      {
        method: "DELETE",
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
        resource_not_found: 404,
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
