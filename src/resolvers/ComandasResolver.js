import { Comanda, Mesa, Subcuenta } from "../models";
import { Types } from 'mongoose';
export default {
    Query: {
        obtenerComandas: async (_, { }) => {
            try {
                const comandas = await Comanda.aggregate([
                    {
                        $match: {
                            estado: 'GENERADA'
                        }
                    },
                    {
                        $lookup: {
                            from: 'subcuentas',
                            localField: '_id',
                            foreignField: 'comanda',
                            as: 'subcuentas'
                        }
                    },
                    {
                        $lookup: {
                            from: 'mesas',
                            localField: 'mesa',
                            foreignField: '_id',
                            as: 'mesa'
                        }
                    },
                    {
                        $unwind: {
                            path: '$mesa',
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $lookup: {
                            from: 'pisos',
                            localField: 'mesa.piso',
                            foreignField: '_id',
                            as: 'mesa.piso'
                        }
                    },
                    {
                        $unwind: {
                            path: '$mesa.piso',
                            preserveNullAndEmptyArrays: true
                        }
                    }
                ]);

                const formattedComandas = comandas.map(comanda => ({
                    id: comanda._id.toString(),
                    fecha: comanda.fecha,
                    mesa: {
                        id: comanda.mesa._id.toString(),
                        numero: comanda.mesa.numero,
                        piso: {
                            id: comanda.mesa.piso._id.toString(),
                            nombre: comanda.mesa.piso.nombre,
                        },
                        tipo: comanda.mesa.tipo,
                    },
                    subcuentas: comanda.subcuentas.map(subcuenta => ({
                        id: subcuenta._id.toString(),
                        platillos: subcuenta.platillos.map(platillo => ({
                            id: platillo.id.toString(),
                            nombre: platillo.nombre,
                            estado: platillo.estado,
                            observaciones: platillo.observaciones,
                        }))
                    }))
                }));
                return formattedComandas;
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching comandas');
            }
        },
        obtenerComandasPendientes: async (_, { }) => {
            try {
                const comandas = await Comanda.aggregate([
                    {
                        $match: {
                            estado: 'GENERADA'
                        }
                    },
                    {
                        $lookup: {
                            from: 'subcuentas',
                            localField: '_id',
                            foreignField: 'comanda',
                            as: 'subcuentas'
                        }
                    },
                    {
                        $lookup: {
                            from: 'mesas',
                            localField: 'mesa',
                            foreignField: '_id',
                            as: 'mesa'
                        }
                    },
                    {
                        $unwind: {
                            path: '$mesa',
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $lookup: {
                            from: 'pisos',
                            localField: 'mesa.piso',
                            foreignField: '_id',
                            as: 'mesa.piso'
                        }
                    },
                    {
                        $unwind: {
                            path: '$mesa.piso',
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            fecha: 1,
                            preFactura: 1,
                            estado: 1,
                            mesa: 1,
                            subcuentas: {
                                $map: {
                                    input: "$subcuentas",
                                    as: "subcuenta",
                                    in: {
                                        _id: "$$subcuenta._id",
                                        numero: "$$subcuenta.numero",
                                        fecha: "$$subcuenta.fecha",
                                        descuento: "$$subcuenta.descuento",
                                        total: "$$subcuenta.total",
                                        moneda: "$$subcuenta.moneda",
                                        estado: "$$subcuenta.estado",
                                        platillos: {
                                            $filter: {
                                                input: "$$subcuenta.platillos",
                                                as: "platillo",
                                                cond: { $eq: ["$$platillo.estado", "Pendiente"] }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                ]);
        
                return comandas.map(comanda => ({
                    id: comanda._id.toString(),
                    fecha: comanda.fecha,
                    preFactura: comanda.preFactura,
                    estado: comanda.estado,
                    mesa: {
                        id: comanda.mesa._id.toString(),
                        numero: comanda.mesa.numero,
                        piso: {
                            id: comanda.mesa.piso._id.toString(),
                            nombre: comanda.mesa.piso.nombre,
                        },
                        tipo: comanda.mesa.tipo,
                    },
                    subcuentas: comanda.subcuentas.map(subcuenta => ({
                        id: subcuenta._id.toString(),
                        numero: subcuenta.numero,
                        fecha: subcuenta.fecha,
                        descuento: subcuenta.descuento,
                        total: subcuenta.total,
                        moneda: subcuenta.moneda,
                        estado: subcuenta.estado,
                        platillos: subcuenta.platillos.map(platillo => ({
                            _id: platillo._id.toString(),
                            id: platillo.id.toString(),
                            nombre: platillo.nombre,
                            precio: platillo.precio,
                            descuento: platillo.descuento,
                            estado: platillo.estado,
                            observaciones: platillo.observaciones
                        }))
                    }))
                }));
            } catch (error) {
                console.error(error);
                throw new Error('Error fetching comandas');
            }
        },  

        obtenerComandaById: async (_, { id }) => {
            try {
                const comanda = await Comanda.find({ id }).populate('mesa');
                const subcuentas = await Subcuenta.find({ comanda: comanda.id });
                comanda.subcuentas = subcuentas;

                return comanda;
            } catch (error) {
                return error;
            }
        },
        obtenerComandaPorMesa: async (_, { id }) => {
            try {
                const comanda = await Comanda.findOne({ mesa: id, estado: 'GENERADA' });
                if (!comanda) {
                    return null;
                }

                const subcuentas = await Subcuenta.find({ comanda: Types.ObjectId(comanda._id) });

                return {
                    ...comanda.toObject(),
                    id: comanda._id.toString(),
                    mesa: {
                        ...comanda.mesa,
                        id: comanda.mesa._id.toString()
                    },
                    subcuentas: subcuentas.map(subcuenta => ({
                        ...subcuenta.toObject(),
                        id: subcuenta._id.toString(),
                    })),
                };
            } catch (error) {
                return error;
            }
        },
    },
    Mutation: {
        insertarComanda: async (_, { input }) => {
            try {
                const { mesa } = input;
                const existe = await Comanda.findOne({ mesa, estado: 'GENERADA' });
                if (existe) {
                    return {
                        estado: false,
                        data: null,
                        message: "La mesa ya posee una comanda abierta"
                    };
                }
                const comanda = new Comanda(input);
                const result = await comanda.save();
                return {
                    estado: true,
                    data: result,
                    message: "Comanda creada con exito"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: error.message || "Ocurrio un error inesperado al guardar la comanda"
                };
            }
        },
        actualizarComanda: async (_, { id, input }) => {
            try {
                const comanda = await Comanda.findOneAndUpdate({ _id: id }, input, { new: true });
                if (!comanda) {
                    return {
                        estado: false,
                        data: null,
                        message: "Ocurrio un error al actualizar la comanda"
                    };
                }
                return {
                    estado: true,
                    data: comanda,
                    message: "La comanda fue actualizada con éxito"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: error.message || "Ocurrio un error inesperado al actualizar la comanda"
                };
            }
        },
        desactivarComanda: async (_, { id }) => {
            try {
                const comanda = await Comanda.findOneAndUpdate({ _id: id }, { estado: 'DESCARTADA' }, { new: true });
                if (!comanda) {
                    return {
                        estado: false,
                        data: null,
                        message: "Ocurrio un error al desactivar la comanda"
                    };
                }
                await Subcuenta.updateMany({ comanda: id }, { estado: 'Cancelado' });
                return {
                    estado: true,
                    data: comanda,
                    message: "La comanda y sus subcuentas fueron desactivadas con éxito"
                };
            } catch (error) {
                console.log(error);
                return {
                    estado: false,
                    data: null,
                    message: error.message || "Ocurrio un error inesperado al desactivar la comanda"
                };
            }

        }
    }
}