import { endpoint } from "./commons";
import { transformToGraphQL } from "../transforms";

const getGroups = async () => {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
      message: "Groups fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching groups", error);
    return {
      status: false,
      data: null,
      message: error.message,
    };
  }
};

export default getGroups;
