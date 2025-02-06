const getAvailability = async ({ filters }) => {
  try {
    const params = new URLSearchParams({
      propertyId: filters.propertyId,
    });

    if (filters.date) params.append("date", filters.date);
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);

    const response = await fetch(
      `http://localhost:4000/api/v1/channex/availability?${params}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "API request failed");
    }

    const { data } = await response.json();

    if (!data) {
      throw new Error(
        "No availability data found for the filters:\n\n" +
          JSON.stringify(filters, null, 2)
      );
    }

    const availabilityArray = Object.entries(data).map(
      ([ratePlanId, datesObj]) => ({
        ratePlanId,
        dates: Object.entries(datesObj).map(([date, availability]) => ({
          date,
          availability,
        })),
      })
    );

    return availabilityArray;
  } catch (error) {
    console.error("Availability fetch error:", error);
    throw new Error(`Failed to get availability: ${error.message}`);
  }
};

export default getAvailability;
