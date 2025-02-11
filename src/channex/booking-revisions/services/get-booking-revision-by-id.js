import { endpoint } from "./commons";
import { transformToGraphQL } from "../transforms";

const getBookingRevisionById = async ({ id }) => {
  try {
    const response = await fetch(`${endpoint}/${id}`);
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
      message: "Booking revision fetched successfully",
    };
  } catch (error) {
    console.error("Error getting booking revision", error);
    return {
      status: false,
      data: null,
      message: error.message,
    };
  }
};

export default getBookingRevisionById;
