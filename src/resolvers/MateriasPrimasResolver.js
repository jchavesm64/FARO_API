import { MateriasPrimas } from '../models'
import { Movimientos } from '../models';

export default {
    Query: {
        obtenerMateriasPrimas: async (_, { tipo }) => {
            try {
                const materias = await MateriasPrimas.find({ estado: 'ACTIVO', tipo: tipo });
                return materias.sort(function (a, b) {
                    if (a.nombre > b.nombre) {
                        return 1
                    }
                    if (a.nombre < b.nombre) {
                        return -1
                    }
                    return 0;
                });
            } catch (error) {
                return error;
            }
        },
        obtenerTodasMateriasPrimas: async (_) => {
            try {
                const materias = await MateriasPrimas.find({ estado: 'ACTIVO' });
                return materias.sort(function (a, b) {
                    if (a.nombre > b.nombre) {
                        return 1
                    }
                    if (a.nombre < b.nombre) {
                        return -1
                    }
                    return 0;
                });
            } catch (error) {
                return error;
            }
        },
        obtenerMateriasPrimasConMovimientos: async (_, { tipo }) => {
            try {
                var materiasmovimientos = []
                const materias = await MateriasPrimas.find({ estado: 'ACTIVO', tipo: tipo });
                materias.map(item => {
                    const result = Movimientos.find({ materia_prima: item.id }).populate('usuario').populate('proveedor')
                    materiasmovimientos.push({
                        materia_prima: item,
                        movimientos: result
                    })
                })
                return materiasmovimientos.sort(function (a, b) {
                    if (a.materia_prima.nombre > b.materia_prima.nombre) {
                        return 1
                    }
                    if (a.materia_prima.nombre < b.materia_prima.nombre) {
                        return -1
                    }
                    return 0;
                });
            } catch (error) {
                return error;
            }
        },
        obtenerMateriaPrima: async (_, { id }) => {
            try {
                let materia = await MateriasPrimas.findById(id);
                const result = Movimientos.find({ materia_prima: materia.id }).populate('usuario').populate('proveedor')
                materia.movimientos = result
                return materia;
            } catch (error) {

            }
        }
    },
    Mutation: {
        insertarMateriaPrima: async (_, { input }) => {
            try {
                const formattedType = input.tipo.charAt(0).toUpperCase() + input.tipo.slice(1).toLowerCase();
                input.tipo = formattedType;
                const materia = new MateriasPrimas(input);
                const result = await materia.save();
                return {
                    estado: true,
                    data: result,
                    message: "La materia prima fue registrada con éxito"
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
        actualizarMateriaPrima: async (_, { id, input }) => {
            try {
                const materia = await MateriasPrimas.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: materia,
                    message: "La materia prima fue actualizada con éxito"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al registrar la materia prima"
                };
            }
        },
        desactivarMateriaPrima: async (_, { id }) => {
            try {
                const materia = await MateriasPrimas.findOneAndUpdate({ _id: id }, { estado: "INACTIVO" }, { new: true });
                if (materia) {
                    return {
                        estado: true,
                        data: null,
                        message: "Materia prima eliminada correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar la materia prima"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al eliminar la materia prima"
                };
            }
        }
    }
}