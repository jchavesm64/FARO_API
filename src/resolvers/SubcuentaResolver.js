import { Subcuenta, MenuLinea, MateriasPrimas } from '../models';

export default {
    Query: {
        obtenerSubcuentas: async (_, { }) => {
            try {
                const subcuentas = await Subcuenta.find({});
                return subcuentas;
            } catch (error) {
                return error;
            }
        },
        obtenerSubcuentaById: async (_, { id }) => {
            try {
                const subcuenta = await Subcuenta.findById(id);
                return subcuenta;
            } catch (error) {
                return error;
            }
        },
        obtenerSubcuentasPorComanda: async (_, { id }) => {
            try {
                const subcuentas = await Subcuenta.find({ comanda: id });
                return subcuentas;
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarSubcuenta: async (_, { input }) => {
            try {
                const { numero, comanda } = input;
                const existe = await Subcuenta.findOne({ numero, comanda });
                if (existe) {
                    //update subcuenta
                    input.platillos.forEach(platillo => {
                        const matchingPlatillo = existe.platillos.find(p => p.id == platillo.id);
                        if (matchingPlatillo) {
                            platillo["entregados"] = platillo.cantidad > matchingPlatillo.entregados ?
                                matchingPlatillo.entregados :
                                platillo.cantidad;
                        }
                    });
                    const subcuenta = await Subcuenta.findOneAndUpdate({ numero, comanda }, input, { new: true });
                    return {
                        estado: true,
                        data: subcuenta,
                        message: "Subcuenta actualizada con exito"
                    };
                }
                const subcuenta = new Subcuenta(input);
                const result = await subcuenta.save();
                return {
                    estado: true,
                    data: result,
                    message: "Subcuenta creada con exito"
                };

            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: error.message || "Ocurrio un error inesperado al guardar la subcuenta"
                };
            }
        },
        actualizarSubcuenta: async (_, { id, input }) => {
            try {
                const subcuenta = await Subcuenta.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: subcuenta,
                    message: "Subcuenta actualizada con exito"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: error.message || "Ocurrio un error inesperado al actualizar la subcuenta"
                };
            }
        },
        actualizarEntregados: async (_, { input }) => {
            try {
                const { subcuenta: subcuentaId, platillo: platilloId, entregados } = input;
                const subcuenta = await Subcuenta.findOne(
                    { _id: subcuentaId, "platillos.id": platilloId },
                    { "platillos.$": 1 }
                );

                if (!subcuenta) {
                    throw new Error('Subcuenta o Platillo no encontrado');
                }

                const platillo = subcuenta.platillos[0];

                const newEntregados = platillo.entregados + entregados;
                if (newEntregados > platillo.cantidad) {
                    throw new Error(`No puedes entregar más de ${platillo.cantidad} unidades. Ya se han entregado ${platillo.entregados}.`);
                }

                const updatedSubcuenta = await Subcuenta.findOneAndUpdate(
                    { _id: subcuentaId, "platillos.id": platilloId },
                    {
                        $inc: { "platillos.$.entregados": entregados }
                    },
                    { new: true }
                );

                const menuLineas = await MenuLinea.find({ menu: platilloId });

                if (!menuLineas.length) {
                    throw new Error('No se encontraron algunas materias primas de este platillo');
                }

                for (const linea of menuLineas) {
                    const { producto, cantidad } = linea;
                    const totalARestar = cantidad * entregados;

                    const materiaPrima = await MateriasPrimas.findOne({ _id: producto });

                    if (!materiaPrima) {
                        throw new Error(`No se encontró la materia prima con id ${producto}`);
                    }

                    materiaPrima.existencias <= 0 ? materiaPrima.existencias = 0 : materiaPrima.existencias -= totalARestar;

                    await materiaPrima.save();
                }

                return {
                    estado: true,
                    data: updatedSubcuenta,
                    message: "Cantidad de platillos entregados actualizada con éxito"
                };
            } catch (error) {
                console.log(error);
                return {
                    estado: false,
                    data: null,
                    message: error.message || "Ocurrió un error inesperado al actualizar la cantidad de platillos entregados"
                };
            }
        },
        desactivarSubcuenta: async (_, { id }) => {
            try {
                const subcuenta = await Subcuenta.findOneAndUpdate({ _id: id }, { estado: 'Cancelado' }, { new: true });
                return {
                    estado: true,
                    data: subcuenta,
                    message: "Subcuenta desactivada con exito"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: error.message || "Ocurrio un error inesperado al desactivar la subcuenta"
                };
            }
        }
    }
}