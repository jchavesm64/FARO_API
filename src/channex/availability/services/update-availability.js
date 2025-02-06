import { endpoint } from "./commons";
import { transformToAPI } from "../transforms";

const updateAvailability = async ({ input }) => {
  try {
    const payload = transformToAPI(input);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());

    if (response.errors) {
      return {
        status: false,
        data: null,
        message: `An error occurred: ${response.errors.title}`,
      };
    }
    return {
      status: true,
      data: response.data,
      message: "Availability updated successfully",
    };
  } catch (error) {
    console.error("Error updating availability:", error);
    throw new Error("Failed to update availability");
  }
};

export default updateAvailability;
