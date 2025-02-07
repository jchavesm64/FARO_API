import { endpoint } from "./commons";
import { transformToGraphQL } from "../transforms";

const getBookings = async () => {
  try {
    const response = await fetch(endpoint);
    const jsonResponse = await response.json();

    if (jsonResponse.errors) {
      return {
        status: false,
        data: null,
        message: jsonResponse.errors,
      };
    }

    return {
      status: true,
      data: transformToGraphQL(jsonResponse.data),
      message: "Bookings fetched successfully",
    };
  } catch (error) {
    console.error("Error getting bookings", error);
    return {
      status: false,
      data: null,
      message: error.message,
    };
  }
};

export default getBookings;
