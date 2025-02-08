import { endpoint } from "./commons";
import { transformToGraphQL, transformToAPI } from "../transforms";

const updateProperty = async ({ id, input }) => {
  try {
    const transformedBody = transformToAPI(input);
    const response = await fetch(`${endpoint}/${id}`, {
      method: "PUT",
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
        message: "Error updating property",
      };
    }

    return {
      status: true,
      data: transformToGraphQL(jsonResponse.data),
      message: "Property updated successfully",
    };
  } catch (error) {
    console.error("Error updating property", JSON.stringify(error));
    return {
      status: false,
      data: error,
      message: `Error updating property ${JSON.stringify(error.message)}`,
    };
  }
};

export default updateProperty;
