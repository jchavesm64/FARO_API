const mongoose = require("mongoose");

const ServiciosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  precio: {
    type: Number,
    require: true,
  },
  cavis: {
    type: String,
  },
  tipo: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "tipoServicio",
  },
  estado: {
    type: String,
    enum: ["ACTIVO", "INACTIVO"],
    trim: true,
  },
});
module.exports = mongoose.model("servicios", ServiciosSchema);
