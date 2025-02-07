const transformGroup = (property) => {
  const { attributes } = property;

  return {
    id: property.id,
    type: property.type,
    attributes: {
      id: attributes.id,
      title: attributes.title,
      currency: attributes.currency,
      minStayType: attributes.min_stay_type,
      propertyType: attributes.property_type_group,
      groupIds: Array.isArray(attributes.group_ids) ? attributes.group_ids : [],
    },
  };
};

export const transformToGraphQL = (data) => {
  if (Array.isArray(data)) {
    return data.map(transformGroup);
  } else {
    return transformGroup(data);
  }
};
