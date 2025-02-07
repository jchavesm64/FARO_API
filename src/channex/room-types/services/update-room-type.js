import { TipoHabitacion } from "../../../models";
import {
  transformToMongo,
  transformToGraphQL,
  transformToAPI,
} from "../transforms";
import { endpoint } from "./commons";

const updateRoomType = async ({ id, input }) => {
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

    const payload = transformToAPI(input);

    const response = await fetch(`${endpoint}/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const jsonResponse = await response.json();

    if (jsonResponse.errors) {
      return {
        status: false,
        data: null,
        message: jsonResponse.errors,
      };
    }

    const roomType = transformToMongo(jsonResponse.data);
    await TipoHabitacion.updateOne({ id: id }, roomType);

    return {
      status: true,
      data: transformToGraphQL(roomType),
      message: "Room type updated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      data: null,
      message: "Internal Server Error",
    };
  }
};

export default updateRoomType;
