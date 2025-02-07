import { endpoint } from "./commons";
import { transformToGraphQL } from "../transforms";

const getPropertiesOptions = async () => {
  try {
    const response = await fetch(`${endpoint}/options`);
    const jsonResponse = await response.json();

    if (jsonResponse.errors) {
      return {
        status: false,
        data: jsonResponse.errors,
        message: "Error fetching properties",
      };
    }

    return {
      status: true,
      data: transformToGraphQL(jsonResponse.data),
      message: "Properties fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching properties", error);
    return {
      status: false,
      data: error,
      message: `Error fetching properties ${error.message}`,
    };
  }
};

export default getPropertiesOptions;
