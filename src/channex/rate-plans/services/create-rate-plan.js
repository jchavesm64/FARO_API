import { transformToGraphQL, transformToAPI } from "../transforms";
import { ratePlanExists, endpoint } from "./commons";

const createRatePlan = async (input) => {
  try {
    const exists = await ratePlanExists(input.title);
    if (exists) {
      return {
        status: false,
        data: null,
        message: "There is already a rate plan with that title",
      };
    }

    const payload = transformToAPI(input);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());

    if (response.errors) {
      return {
        status: false,
        data: null,
        message: `An error occurred: ${response.errors.title}, ${JSON.stringify(
          response.errors.details
        )}`,
      };
    }

    return {
      status: true,
      data: transformToGraphQL(response),
      message: "Rate plan created successfully",
    };
  } catch (error) {
    console.error("Error creating rate plan", error);
    return {
      status: false,
      data: null,
      message: "An error occurred while creating the rate plan",
    };
  }
};

export default createRatePlan;
