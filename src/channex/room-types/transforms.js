export const transformToMongo = (channexPayload) => {
  const attributes = channexPayload.attributes;
  const relationships = channexPayload.relationships;

  return {
    nombre: attributes.title,
    descripcion: attributes.content.description || "",
    precioBase: 0,

    channex: {
      roomTypeId: attributes.id,
      propertyId: relationships.property.data.id || "",
      countOfRooms: attributes.count_of_rooms || 0,
      occAdults: attributes.occ_adults || 0,
      occChildren: attributes.occ_children || 0,
      occInfants: attributes.occ_infants || 0,
      defaultOccupancy: attributes.default_occupancy || 0,
      facilities: relationships.facilities.data || [],
      roomKind: attributes.room_kind || "room",
      capacity: attributes.capacity || 0,
      content: {
        description: attributes.content.description || "",
        photos: (attributes.content.photos || []).map(transformPhoto),
      },
    },
  };
};

export const transformToAPI = (graphqlPayload) => ({
  room_type: {
    title: graphqlPayload.nombre,
    property_id: graphqlPayload.channex.propertyId,
    count_of_rooms: graphqlPayload.channex.countOfRooms,
    occ_adults: graphqlPayload.channex.occAdults,
    occ_children: graphqlPayload.channex.occChildren,
    occ_infants: graphqlPayload.channex.occInfants,
    default_occupancy: graphqlPayload.channex.defaultOccupancy,

    facilities: graphqlPayload.channex.facilities || [],
    room_kind: graphqlPayload.channex.roomKind || "room",
    capacity: graphqlPayload.channex.capacity || 0,
    content: {
      description: graphqlPayload.channex.content?.description || "",
      photos: (graphqlPayload.channex.content?.photos?.map(transformPhoto)) || [],
    },
  },
});

export const transformToGraphQL = (mongoPayload) => ({
  id: mongoPayload.channex.roomTypeId,
  nombre: mongoPayload.nombre ?? "",
  descripcion: mongoPayload.descripcion ?? "",
  precioBase: mongoPayload.precioBase || 0,
  estado: mongoPayload.estado || "ACTIVO",

  channex: {
    propertyId: mongoPayload.channex.propertyId,
    roomTypeId: mongoPayload.channex.roomTypeId,
    countOfRooms: mongoPayload.channex.countOfRooms,
    occAdults: mongoPayload.channex.occAdults,
    occChildren: mongoPayload.channex.occChildren,
    occInfants: mongoPayload.channex.occInfants,
    defaultOccupancy: mongoPayload.channex.defaultOccupancy,
    facilities: mongoPayload.channex.facilities,
    roomKind: mongoPayload.channex.roomKind,
    capacity: mongoPayload.channex.capacity,
    content: {
      description: mongoPayload.channex.content.description,
      photos: mongoPayload.channex.content.photos.map(transformPhoto),
    },
  },
});

const transformPhoto = (photo) => ({
  url: photo.url || "",
  position: photo.position || 0,
  description: photo.description || "",
  author: photo.author || "",
  kind: photo.kind || "",
});
