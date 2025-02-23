const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
  },
  precio: {
    type: Number,
    require: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  estado: {
    type: String,
    enum: ["ACTIVO", "INACTIVO"],
    trim: true,
  },
});

module.exports = mongoose.model("item", ItemSchema);