import { TipoHabitacion } from "../../../models";
import { transformToMongo, transformToGraphQL } from "../transforms";

const externalApiUrl = "http://localhost:4000/api/v1/channex/room_types";
const syncIntervalMinutes = 1;

const getRoomTypes = async () => {
  try {
    const apiResponse = await fetch(externalApiUrl);
    const freshData = await apiResponse.json();

    const bulkOps = freshData.data.map((roomType) => ({
      updateOne: {
        filter: { "channex.roomTypeId": roomType.attributes.id },
        update: {
          $set: {
            ...transformToMongo(roomType),
          },
        },
        upsert: true,
      },
    }));

    await TipoHabitacion.bulkWrite(bulkOps);

    const updatedData = await TipoHabitacion.find({});
    return updatedData.map(transformToGraphQL);
  } catch (error) {
    console.error("Error during sync:", error);
    const fallbackData = await TipoHabitacion.find({});
    if (fallbackData.length > 0) {
      return fallbackData.map(transformToGraphQL);
    }
    throw new Error("Failed to fetch room types");
  }
};

export default getRoomTypes;
