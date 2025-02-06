import { transformToGraphQL, transformToAPI } from "../transforms";
import { endpoint } from "./commons";


const updateRatePlan = async ({ id, input }) => {
  try {
    const payload = transformToAPI(input);
    console.log("payload", payload.rate_plan);
    const response = await fetch(`${endpoint}/${id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());

    console.log("response", response.data);

    if (response.errors) {
      return {
        status: false,
        data: null,
        message: `An error occurred: ${response.errors.title}`,
      };
    }

    return {
      status: true,
      data: transformToGraphQL(response.data),
      message: "Rate plan updated successfully",
    };
  } catch (error) {
    console.error("Error updating rate plan", error);
    return {
      status: false,
      data: null,
      message: "An error occurred while updating the rate plan",
    };
  }
};

export default updateRatePlan;