const transformForUpdate = (apiPayload) => {
  return {
    data: apiPayload.data.map(({ id, type }) => ({
      id,
      type,
    })),
    meta: apiPayload.meta,
  };
};

const transformForRetrieval = (apiPayload) => {
  if (!apiPayload) {
    return { data: [] };
  }
  const transformedData = Object.entries(apiPayload).map(([id, dates]) => {
    return {
      id,
      dates: Object.entries(dates).map(([date, { rate }]) => ({
        date,
        rate: parseFloat(rate),
        availability: dates[date].availability,
        min_stay_arrival: dates[date].min_stay_arrival,
        min_stay_through: dates[date].min_stay_through,
        min_stay: dates[date].min_stay,
        closed_to_arrival: dates[date].closed_to_arrival,
        closed_to_departure: dates[date].closed_to_departure,
        stop_sell: dates[date].stop_sell,
        max_stay: dates[date].max_stay,
        availability_offset: dates[date].availability_offset,
        max_availability: dates[date].max_availability,
      })),
    };
  });

  return {
    data: transformedData,
  };
};

export const transformToGraphQL = (apiPayload) => {
  if (Array.isArray(apiPayload.data)) {
    return transformForUpdate(apiPayload);
  } else {
    return transformForRetrieval(apiPayload);
  }
};

const transformRestriction = (restriction) => {
  return {
    property_id: restriction.propertyId,
    rate_plan_id: restriction.ratePlanId,
    date: restriction.date ? restriction.date : null,
    date_from: restriction.dateFrom ? restriction.dateFrom : null,
    date_to: restriction.dateTo ? restriction.dateTo : null,
    days: restriction.days,
    rate: restriction.rate,
    min_stay_arrival: restriction.minStayArrival,
    min_stay_through: restriction.minStayThrough,
    min_stay: restriction.minStay,
    max_stay: restriction.maxStay,
    closed_to_arrival: restriction.closedToArrival,
    closed_to_departure: restriction.closedToDeparture,
    stop_sell: restriction.stopSell,
  };
};

export const transformToAPI = (graphqlPayload) => {
  const payload = Array.isArray(graphqlPayload)
    ? graphqlPayload[0]
    : graphqlPayload;

  return {
    values: payload.values.map(transformRestriction),
  };
};
