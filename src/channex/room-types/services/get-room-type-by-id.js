import { TipoHabitacion } from "../../../models";
import { transformToMongo, transformToGraphQL } from "../transforms";

const endpoint = "http://localhost:4000/api/v1/channex/room_types";
const syncIntervalMinutes = 1;

const getRoomTypeById = async (id) => {
  try {
    // Check for fresh cached data
    const cutoffDate = new Date(Date.now() - syncIntervalMinutes * 60 * 1000);
    const cachedData = await TipoHabitacion.findOne({
      "channex.roomTypeId": id,
    });

    if (cachedData) {
      return transformToGraphQL(cachedData);
    }

    // Fetch fresh data from external API
    const apiResponse = await fetch(`${endpoint}/${id}`);
    const freshData = await apiResponse.json();

    // Prepare bulk operations to update or insert data
    const bulkOps = [
      {
        updateOne: {
          filter: { "channex.roomTypeId": freshData.data.attributes.id },
          update: {
            $set: {
              ...transformToMongo(freshData.data),
              lastSyncedAt: new Date(),
              syncStatus: "fresh",
            },
          },
          upsert: true,
        },
      },
    ];

    await TipoHabitacion.bulkWrite(bulkOps);

    // Return the updated data
    const updatedData = await TipoHabitacion.find({
      "channex.roomTypeId": id,
    });
    return updatedData.map(transformToGraphQL);
  } catch (error) {
    console.error("Error during sync:", error);
    // Fallback to any cached data if available
    const fallbackData = await TipoHabitacion.find({
      "channex.roomTypeId": id,
    });
    if (fallbackData) {
      return transformToGraphQL(fallbackData);
    }
    throw new Error(`Failed to fetch room type with ID ${id}`);
  }
};

export default getRoomTypeById;
