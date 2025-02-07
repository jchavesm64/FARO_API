import { TipoHabitacion } from "../../../models";
import { transformToMongo, transformToGraphQL } from "../transforms";

const endpoint = "http://localhost:4000/api/v1/channex/room_types";

const createRoomType = async (input) => {
  try {
    const existsInAPI = await fetch(endpoint);
    const existsInAPIJson = await existsInAPI.json();

    const found = existsInAPIJson.data.find(
      (roomType) => roomType.attributes.title === input.nombre
    );

    if (found) {
      return {
        status: true,
        data: null,
        message: "There is already a room type with that name",
      };
    }

    const exists = await TipoHabitacion.findOne({ nombre: input.nombre });
    if (exists) {
      return {
        status: true,
        data: null,
        message: "There is already a room type with that name",
      };
    }

    const payload = {
      room_type: {
        title: input.nombre,
        property_id: input.channex.propertyId,
        count_of_rooms: input.channex.countOfRooms,
        occ_adults: input.channex.occAdults,
        occ_children: input.channex.occChildren,
        occ_infants: input.channex.occInfants,
        default_occupancy: input.channex.defaultOccupancy,
        facilities: input.channex.facilities,
        room_kind: input.channex.roomKind,
        capacity: input.channex.capacity,
        content: {
          description: input.channex.content.description,
        },
      },
    };

    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const jsonResponse = await response.json();
    if (jsonResponse.errors) {
      return {
        status: false,
        data: null,
        message: "An error occurred: " + jsonResponse.errors.title,
      };
    }

    const result = transformToMongo(jsonResponse.data);
    await TipoHabitacion.create(result);

    return {
      status: true,
      data: transformToGraphQL(result),
      message: "Room type created successfully",
    };
  } catch (error) {
    console.error(error);

    return {
      status: false,
      data: null,
      message: "An error occurred: " + error.message,
    };
  }
};

export default createRoomType;
