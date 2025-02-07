import { endpoint } from "./commons";

const updateGroup = async ({ id, input }) => {
  try {
    const response = await fetch(`${endpoint}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
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
      data: jsonResponse.data,
      message: "Group updated successfully",
    };
  } catch (error) {
    console.error("Error updating group", error);
    return {
      status: false,
      data: null,
      message: error.message,
    };
  }
};

export default updateGroup;