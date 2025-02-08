import { endpoint } from "./commons";

const deleteProperty = async ({ id }) => {
  try {
    const response = await fetch(`${endpoint}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonResponse = await response.json();

    if (jsonResponse.errors) {
      return {
        status: false,
        data: null,
        message: "Error deleting property",
      };
    }

    return {
      status: true,
      data: jsonResponse.data,
      message: "Property deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting property", error);
    return {
      status: false,
      data: error,
      message: `Error deleting property ${error.message}`,
    };
  }
};

export default deleteProperty;
