import { endpoint } from "./commons";
import { transformToGraphQL, transformToAPI } from "../transforms";

const createProperty = async ({ input }) => {
  try {
    const transformedBody = transformToAPI(input);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformedBody),
    });
    const jsonResponse = await response.json();

    if (jsonResponse.errors) {
      return {
        status: false,
        data: null,
        message: "Error creating property",
      };
    }

    return {
      status: true,
      data: transformToGraphQL(jsonResponse.data),
      message: "Property created successfully",
    };
  } catch (error) {
    console.error("Error creating property", JSON.stringify(error));
    return {
      status: false,
      data: error,
      message: `Error creating property ${JSON.stringify(error.message)}`,
    };
  }
};

export default createProperty;
