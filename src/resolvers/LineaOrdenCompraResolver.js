import { LineaOrdenCompra, OrdenCompra } from '../models'

export default {
    Query: {
        obtenerLineasOrdenCompra: async (_, { id }) => {
            try {
                const lineas = await LineaOrdenCompra.find({ estado: 'ACTIVO' }).populate('producto').populate('impuesto');
                return lineas
            } catch (error) {
                return error;
            }
        },
        obtenerLineaOrdenCompra: async (_, { id }) => {
            try {
                const linea = await LineaOrdenCompra.findById(id);
                return linea;
            } catch (error) {

            }
        }
    },
    Mutation: {
        insertarLineaOrdenCompra: async (_, { input }) => {
            try {
                const linea = new LineaOrdenCompra(input);
                const result = await linea.save();
                return {
                    estado: true,
                    data: result,
                    message: "La linea fue registrada con éxito"
                };
            } catch (error) {
                console.log(error)
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al registrar el MateriasPrimas"
                };
            }
        },
        actualizarLineaOrdenCompra: async (_, { id, input }) => {
            try {
                const linea = await LineaOrdenCompra.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: linea,
                    message: "La linea fue actualizada con éxito"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al registrar la linea"
                };
            }
        },
        desactivarLineaOrdenCompra: async (_, { id, idOrden }) => {
            try {
                const orden = await OrdenCompra.findOne({ _id: idOrden }).populate('lineasPedido');
                let lineasPedido = orden.lineasPedido.filter(l=>l.id!==id)
                lineasPedido = lineasPedido.map(l=> l.id)

                await OrdenCompra.findOneAndUpdate({ _id: idOrden }, {
                    lineasPedido: lineasPedido
                }, { new: true });

                const linea = await LineaOrdenCompra.deleteOne({ _id: id })
                console.log(linea);
                if (linea) {
                    return {
                        estado: true,
                        data: null,
                        message: "Línea eliminada correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar la linea"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al eliminar la linea"
                };
            }
        }
    }
}