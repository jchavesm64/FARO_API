import { AlmacenLinea } from '../models';
import mongoose from 'mongoose';

export default {
    Query: {
        obtenerLineasAlmacen: async (_, { id}) => {
            try {
                const lineas = await AlmacenLinea.find({ almacen: id }).populate('almacen').populate('producto');
                return lineas
            } catch (error) {
                return error;
            }
        },
        obtenerLineaAlmacen: async (_, { id }) => {
            try {
                const linea = await AlmacenLinea.findOne({id: id}).populate('almacen').populate('producto');
                return linea;
            } catch (error) {

            }
        }
    },
    Mutation: {
        insertarLineaAlmacen: async (_, { input }) => {
            try {
                const { almacen, producto } = input;
                const existe = await AlmacenLinea.findOne({ almacen: almacen, producto: producto });
                if (existe) {
                    input.cantidad = parseFloat(existe.cantidad) + parseFloat(input.cantidad)
                    const linea = await AlmacenLinea.findOneAndUpdate({ _id: existe.id }, input, { new: true });
                    return {
                        estado: true,
                        data: linea,
                        message: "Línea actualizada correctamente"
                    };
                } else {
                    const linea = new AlmacenLinea(input);
                    const result = await linea.save();
                    return {
                        estado: true,
                        data: result,
                        message: "Línea creada con exito"
                    }
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al registrar la línea"
                };
            }
        },
        actualizarLineaAlmacen: async (_, { id, input }) => {
            try {
                const linea = await AlmacenLinea.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: linea,
                    message: "Línea actualizada correctamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar la línea"
                };
            }
        },
    }
}