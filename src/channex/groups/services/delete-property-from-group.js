import { endpoint } from "./commons";

const deletePropertyFromGroup = async ({ groupId, propertyId }) => {
  try {
    const response = await fetch(
      `${endpoint}/${groupId}/properties/${propertyId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
      message: "Property deleted from group successfully",
    };
  } catch (error) {
    console.error("Error deleting property from group", error);
    return {
      status: false,
      data: null,
      message: error.message,
    };
  }
};

export default deletePropertyFromGroup;
