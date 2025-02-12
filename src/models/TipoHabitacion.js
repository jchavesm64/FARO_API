const mongoose = require("mongoose");

const TipoHabitacionSchema = new mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true,
  },
  descripcion: {
    type: String,
    require: true,
    trim: true,
  },
  precioBase: {
    type: Number,
    require: true,
  },
  estado: {
    type: String,
    enum: ["ACTIVO", "INACTIVO"],
    trim: true,
  },

  /**
   * The following fields are essential for Channex API
   */
  channex: {
    propertyId: { type: String, required: false },
    roomTypeId: { type: String, required: false },
    countOfRooms: { type: Number },
    occAdults: { type: Number },
    occChildren: { type: Number },
    occInfants: { type: Number },
    defaultOccupancy: { type: Number },
    facilities: { type: Array, default: [] },
    roomKind: { type: String, enum: ["room", "dorm"] },
    capacity: { type: Number },
    content: {
      description: { type: String, trim: true },
      photos: [
        {
          url: String,
          position: Number,
          description: String,
          author: String,
          kind: String,
        },
      ],
    },
  },
});
module.exports = mongoose.model("tipoHabitacion", TipoHabitacionSchema);
