import { endpoint } from "./commons";
import { transformToGraphQL } from "../transforms";

const deleteRatePlan = async ({ id }) => {
  try {
    const response = await fetch(`${endpoint}/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());

    if (response.errors) {
      return {
        status: false,
        data: null,
        message: `An error occurred: ${response.errors.title}`,
      };
    }

    return {
      status: true,
      data: response.meta,
      message: "Rate plan deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting rate plan", error);
    return {
      status: false,
      data: null,
      message: "An error occurred while deleting the rate plan",
    };
  }
};

export default deleteRatePlan;
