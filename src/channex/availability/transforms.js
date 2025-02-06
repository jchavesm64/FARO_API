export const transformToAPI = (graphqlPayload) => {
  const values = graphqlPayload.values;
  return {
    values: values.map((value) => {
      return {
        property_id: value.propertyId,
        room_type_id: value.roomTypeId,
        date: value.date,
        date_from: value.dateFrom,
        date_to: value.dateTo,
        availability: value.availability,
      };
    }),
  };
};

export const transformToGraphQL = (apiPayload) => {
  const values = apiPayload.values;
  return {
    values: values.map((value) => {
      return {
        id: value.id,
        propertyId: value.property_id,
        roomTypeId: value.room_type_id,
        date: value.date,
        dateFrom: value.date_from,
        dateTo: value.date_to,
        availability: value.availability,
      };
    }),
  };
};
