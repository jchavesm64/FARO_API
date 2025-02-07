const transformGroup = (group) => {
  const { attributes, relationships } = group;

  return {
    id: group.id,
    type: group.type,
    attributes: {
      id: attributes.id,
      title: attributes.title,
    },
    relationships: relationships,
  };
};

export const transformToGraphQL = (apiPayload) => {
  if (Array.isArray(apiPayload)) {
    return apiPayload.map(transformGroup);
  } else {
    return transformGroup(apiPayload);
  }
};
