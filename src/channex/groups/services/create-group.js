import { endpoint } from "./commons";

const createGroup = async ({ input }) => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
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
      message: "Group created successfully",
    };
  } catch (error) {
    console.error("Error creating group", error);
    return {
      status: false,
      data: null,
      message: error.message,
    };
  }
};

export default createGroup;
