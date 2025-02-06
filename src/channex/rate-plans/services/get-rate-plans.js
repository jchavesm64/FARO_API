import { transformToGraphQL } from "../transforms";
import { endpoint } from "./commons";

const getRatePlans = async () => {
  try {
    const response = await fetch(endpoint).then((res) => res.json());
    if (response.errors) {
      console.error("Error during sync:", response.errors);
      return [];
    }

    return transformToGraphQL(response.data);
  } catch (error) {
    console.error("Error during sync:", error);
    return [];
  }
};

export default getRatePlans;
