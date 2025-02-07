import { endpoint } from "./commons";

const addPropertyToGroup = async ({ groupId, propertyId }) => {
  try {
    const response = await fetch(
      `${endpoint}/${groupId}/properties/${propertyId}`,
      {
        method: "POST",
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
      message: "Property added to group successfully",
    };
  } catch (error) {
    console.error("Error adding property to group", error);
    return {
      status: false,
      data: null,
      message: error.message,
    };
  }
};

export default addPropertyToGroup;
