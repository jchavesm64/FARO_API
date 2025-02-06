export const endpoint = "http://localhost:4000/api/v1/channex/rate_plans";

export const ratePlanExists = async (title) => {
  try {
    const apiData = await fetch(endpoint).then((res) => res.json());
    const foundInAPI = apiData.data.some(
      (ratePlan) => ratePlan.attributes.title === title
    );

    if (foundInAPI) return true;
  } catch (error) {
    console.error("Error verifying rate plan existence", error);
    throw new Error("Error verifying rate plan existence");
  }
};
