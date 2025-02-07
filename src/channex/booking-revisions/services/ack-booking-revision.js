import { endpoint } from "./commons";

const ackBookingRevision = async ({ id }) => {
  try {
    const response = await fetch(`${endpoint}/${id}/ack`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-api-key": process.env.CHANNEX_API_KEY,
      },
    });
    const data = await response.json();

    if (data.errors) {
      return {
        status: false,
        data: null,
        message: data.errors,
      };
    }

    return {
      status: true,
      data: data,
      message: "Booking revision acknowledged successfully",
    };
  } catch (error) {
    console.error("Error acknowledging booking revision", error);
    return {
      status: false,
      data: null,
      message: error.message,
    };
  }
};

export default ackBookingRevision;
