import { endpoint } from "./commons";
import { transformToGraphQL } from "../transforms";

const getRestrictions = async ({ filters }) => {
  try {
    const response = await fetch(`${endpoint}/filters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filters }),
    });

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
      message: "Restrictions fetched successfully",
    };
  } catch (error) {
    console.error("Error getting restrictions", error);
    return {
      status: false,
      data: null,
      message: error.message,
    };
  }
};

export default getRestrictions;
