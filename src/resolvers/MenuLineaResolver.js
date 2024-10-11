import { MenuLinea } from '../models';
import mongoose from 'mongoose';

export default {
    Query: {
        obtenerLineasMenu: async (_, { id }) => {
            try {
                const lineas = await MenuLinea.find({ menu: id }).populate('menu').populate('producto');
                return lineas
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        obtenerLineaMenu: async (_, { id }) => {
            try {
                const linea = await MenuLinea.findById(id).populate('menu').populate('producto');
                return linea;
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    },
    Mutation: {
        insertarLineaMenu: async (_, { input }) => {
            try {
                const { menu, producto } = input;
                const existe = await MenuLinea.findOne({ menu: menu, producto: producto });
                if (existe) {
                    return {
                        estado: true,
                        data: null,
                        message: "El ingrediente ya existe"
                    };
                } else {
                    const linea = new MenuLinea(input);
                    const result = await linea.save();
                    return {
                        estado: true,
                        data: result,
                        message: "Ingrediente creado con exito"
                    }
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al registrar el ingrediente"
                };
            }
        },
        actualizarLineaMenu: async (_, { id, input }) => {
            try {
                console.log(id, input);
                const linea = await MenuLinea.findOneAndUpdate({ _id: id }, input, { new: true });
                console.log(linea);
                return {
                    estado: true,
                    data: linea,
                    message: "Ingrediente actualizado correctamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar el ingrediente"
                };
            }
        },
        desactivarLineaMenu: async (_, { id }) => {
            try {
                const menu = await MenuLinea.findByIdAndDelete(id)
                if (menu) {
                    return {
                        estado: true,
                        data: null,
                        message: "Ingrediente eliminado correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar el ingrediente"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al eliminar el ingrediente"
                };
            }
        }
    }
}