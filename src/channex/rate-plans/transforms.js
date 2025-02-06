export const transformToAPI = (graphqlPayload) => ({
  rate_plan: {
    title: graphqlPayload.title,
    property_id: graphqlPayload.propertyId,
    room_type_id: graphqlPayload.roomTypeId,
    options: transformRatePlanOptionsToAPI(graphqlPayload.options),
    tax_set_id: graphqlPayload.taxSetId,
    parent_rate_plan_id: graphqlPayload.parentRatePlanId,
    currency: graphqlPayload.currency,
    sell_mode: graphqlPayload.sellMode,
    rate_mode: graphqlPayload.rateMode,
    meal_type: graphqlPayload.mealType,
    children_fee: graphqlPayload.childrenFee,
    infant_fee: graphqlPayload.infantFee,
    max_stay: graphqlPayload.maxStay,
    min_stay_arrival: graphqlPayload.minStayArrival,
    min_stay_through: graphqlPayload.minStayThrough,
    closed_to_arrival: graphqlPayload.closedToArrival,
    closed_to_departure: graphqlPayload.closedToDeparture,
    stop_sell: graphqlPayload.stopSell,
  },
});

const transformRatePlanOptionsToAPI = (options) => {
  return options.map((option) => {
    const occupancy = option.occupancy ?? option.occupancy;
    const isPrimary = option.isPrimary ?? option.is_primary;
    const derivedOption = option.derivedOption ?? option.derived_option;
    const rate = option.rate;

    return {
      occupancy,
      is_primary: isPrimary,
      derived_option: derivedOption ? { rate: derivedOption.rate } : {},
      rate,
    };
  });
};

const transformRatePlanOptionsToGraphQL = (options) => {
  return options.map((option) => {
    const occupancy = option.occupancy ?? option.occupancy;
    const isPrimary = option.isPrimary ?? option.is_primary;
    const derivedOption = option.derivedOption ?? option.derived_option;
    const rate = option.rate;

    return {
      occupancy,
      isPrimary,
      derivedOption: derivedOption ? { rate: derivedOption.rate } : {},
      rate,
    };
  });
};

const transformRatePlanAttributesToGraphQL = (attributes, relationships) => ({
  id: attributes.id,
  title: attributes.title,
  propertyId: relationships.property.data.id,
  roomTypeId: relationships.room_type.data.id,
  options: transformRatePlanOptionsToGraphQL(attributes.options),
  taxSetId: relationships.tax_set ? relationships.tax_set.data.id : null,
  parentRatePlanId: relationships.parent_rate_plan
    ? relationships.parent_rate_plan.data.id
    : null,
  currency: attributes.currency,
  sellMode: attributes.sell_mode,
  rateMode: attributes.rate_mode,
  mealType: attributes.meal_type,
  childrenFee: attributes.children_fee,
  infantFee: attributes.infant_fee,
  maxStay: attributes.max_stay,
  minStayArrival: attributes.min_stay_arrival,
  minStayThrough: attributes.min_stay_through,
  closedToArrival: attributes.closed_to_arrival,
  closedToDeparture: attributes.closed_to_departure,
  stopSell: attributes.stop_sell,
});

export const transformToGraphQL = (apiPayload) => {
  if (Array.isArray(apiPayload)) {
    return apiPayload.map((ratePlan) =>
      transformRatePlanAttributesToGraphQL(
        ratePlan.attributes,
        ratePlan.relationships
      )
    );
  }

  return transformRatePlanAttributesToGraphQL(
    apiPayload.attributes,
    apiPayload.relationships
  );
};
