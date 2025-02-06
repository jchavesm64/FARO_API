import { transformToGraphQL } from "../transforms";
import { endpoint } from "./commons";

const getRatePlanById = async (id) => {
  try {
    const response = await fetch(`${endpoint}/${id}`).then((res) => res.json());

    if (response.errors) {
      console.error("Error during getRatePlanById:", response.errors);
      return null;
    }

    return transformToGraphQL(response.data);
  } catch (error) {
    console.error("Error during getRatePlanById:", error);
    return null;
  }
};

export default getRatePlanById;
