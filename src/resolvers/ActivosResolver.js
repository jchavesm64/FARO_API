import { MovimientosActivo, Activo } from '../models';

export default {
    Query: {
        obtenerActivos: async (_, { }) => {
            try {
                const activos = await Activo.find({ estado: 'ACTIVO' })
                    .sort({ fechaRegistro: -1, nombre: 1, referenciaInterna: 1 });
                return activos;
            } catch (error) {
                return error;
            }
        },
        obtenerActivo: async (_, { id }) => {
            try {
                const activo = await Activo.findById(id);
                return activo;
            } catch (error) {
                return error;
            }
        },
        obtenerActivoConMovimientos: async (_, { id }) => {
            try {
                const activo = await Activo.findById(id);
                const movimientos = await MovimientosActivo.find({ activos: id }).populate('consecutivo');
                activo.movimientos = movimientos;
                return activo;
            } catch (error) {
                return error;
            }
        },
        obtenerActivosConMovimientos: async (_, { }) => {
            try {
                let activosmovimientos = []
                const activos = await Activo.find({ estado: 'ACTIVO' });
                activos.map(item => {
                    const result = MovimientosActivo.find({ activos: item.id }).populate('consecutivo')
                    activosmovimientos.push({
                        activo: item,
                        movimientos: result
                    })
                })
                return activosmovimientos.sort(function (a, b) {
                    if (a.activo.nombre > b.activo.nombre) {
                        return 1
                    }
                    if (a.activo.nombre < b.activo.nombre) {
                        return -1
                    }
                    return 0;
                });
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarActivo: async (_, { input }) => {
            try {
                const { nombre, referenciaInterna } = input;
                const existe = await Activo.findOne({ nombre, referenciaInterna });
                if (existe) {
                    return {
                        estado: false,
                        data: null,
                        message: "Ya existe un activo con ese nombre y referencia interna"
                    }
                }
                input.fechaRegistro = new Date();
                const activo = new Activo(input);
                const result = await activo.save();
                return {
                    estado: true,
                    data: result,
                    message: "Se registro correctamente el activo"
                }
            } catch (error) {
                console.log(error)
                return error;
            }
        },
        actualizarActivo: async (_, { id, input }) => {
            try {
                const activo = await Activo.findByIdAndUpdate(id, input, { new: true });
                return {
                    estado: true,
                    data: activo,
                    message: "Se actualizo correctamente el activo"
                }
            } catch (error) {
                return error;
            }
        },
        desactivarActivo: async (_, { id }) => {
            try {
                const activo = await Activo.findByIdAndUpdate(id, { estado: 'INACTIVO' }, { new: true });
                return {
                    estado: true,
                    data: activo,
                    message: "Se desactivo correctamente el activo"
                }
            } catch (error) {
                return error;
            }
        }
    }
}

