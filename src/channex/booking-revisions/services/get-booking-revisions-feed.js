import { endpoint } from "./commons";
import { transformToGraphQL } from "../transforms";

const getBookingRevisionsFeed = async () => {
  try {
    const response = await fetch(`${endpoint}/feed`);
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
      message: "Booking revisions feed fetched successfully",
    };
  } catch (error) {
    console.error("Error getting booking revisions", error);
    return {
      status: false,
      data: null,
      message: error.message,
    };
  }
};

export default getBookingRevisionsFeed;
