const transformProperty = (property) => {
  const { attributes, relationships } = property;

  return {
    id: property.id,
    type: property.type,
    attributes: {
      id: attributes.id,
      title: attributes.title,
      isActive: attributes.is_active,
      email: attributes.email,
      phone: attributes.phone,
      currency: attributes.currency,
      country: attributes.country,
      state: attributes.state,
      city: attributes.city,
      address: attributes.address,
      zipCode: attributes.zip_code,
      latitude: attributes.latitude,
      longitude: attributes.longitude,
      timezone: attributes.timezone,
      propertyType: attributes.property_type,
      content: attributes.content ? attributes.content : {},
      logoUrl: attributes.logo_url ? attributes.logo_url : "",
      website: attributes.website ? attributes.website : "",
      groupId: relationships.groups.data.id,
    },
  };
};

export const transformToGraphQL = (apiPayload) => {
  if (Array.isArray(apiPayload)) {
    return apiPayload.map(transformProperty);
  } else {
    return [transformProperty(apiPayload)];
  }
};

const transformPropertyOptions = (property) => {
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

const transformGroup = (group) => {
  const { attributes } = group;

  return {
    id: group.id,
    type: group.type,
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

export const transformOptionsToGraphQL = (data) => {
  if (Array.isArray(data)) {
    return data.map(transformGroup);
  } else {
    return transformPropertyOptions(data);
  }
};

export const transformToAPI = (graphqlPayload) => {
  return {
    property: {
      title: graphqlPayload.title,
      email: graphqlPayload.email,
      phone: graphqlPayload.phone,
      currency: graphqlPayload.currency,
      country: graphqlPayload.country,
      state: graphqlPayload.state,
      city: graphqlPayload.city,
      address: graphqlPayload.address,
      zip_code: graphqlPayload.zipCode,
      latitude: graphqlPayload.latitude,
      longitude: graphqlPayload.longitude,
      timezone: graphqlPayload.timezone,
      // property_type: graphqlPayload.propertyType,
      group_id: graphqlPayload.groupId,
      content: graphqlPayload.content,
      logo_url: graphqlPayload.logoUrl,
      website: graphqlPayload.website,
      facilities: graphqlPayload.facilities,
      settings: graphqlPayload.settings,
    },
  };
};
