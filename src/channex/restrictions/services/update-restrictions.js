import { endpoint } from "./commons";
import { transformToGraphQL, transformToAPI } from "../transforms";

const updateRestrictions = async ({ input }) => {
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
        message: jsonResponse.errors.details,
      };
    }

    return {
      status: true,
      data: jsonResponse,
      message: "Restrictions updated successfully",
    };
  } catch (error) {
    console.error("Error updating restrictions", error);
    return {
      status: false,
      data: null,
      message: error.message,
    };
  }
};

export default updateRestrictions;
