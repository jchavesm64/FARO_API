import { TipoHabitacion } from "../../../models";

const disableRoomType = async ({ id }) => {
  try {
    const roomType = await TipoHabitacion.findOneAndUpdate(
      { "channex.roomTypeId": id },
      { estado: "INACTIVO" },
      { new: true }
    );

    if (!roomType) {
      return {
        status: false,
        data: null,
        message: "Failed to disable room type",
      };
    }

    return {
      status: true,
      data: null,
      message: "Room type disabled successfully",
    };
  } catch (error) {
    console.error("Error during room type disabling:", error);
    return {
      status: false,
      data: null,
      message: "Failed to disable room type",
    };
  }
};

export default disableRoomType;
