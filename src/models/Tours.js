const mongoose = require("mongoose");

const TourSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: [
      "Educativos",
      "Temáticos",
      "Aventura",
      "Relax",
      "Urbanos",
      "Naturales",
      "Culturales",
    ],
    require: true,
    trim: true,
  },
  nombre: {
    type: String,
    trim: true,
  },
  porcentajeGanancia: {
    type: Number,
    require: true,
    min: 0,
    max: 100,
  },
  precio: {
    type: Number,
    require: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  diasDisponibles: {
    type: String,
    enum: [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo",
    ],
    require: true,
  },
  proveedor: {
    type: mongoose.Schema.Types.Mixed,
    trim: true,
  },
  estado: {
    type: String,
    enum: ["ACTIVO", "INACTIVO"],
    trim: true,
  },
});

module.exports = mongoose.model("tour", TourSchema);
