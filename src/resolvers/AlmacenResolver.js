import { Almacen } from "../models";

export default {
    Query: {
        obtenerAlmacenes: async (_, { }) => {
            try {
                const almacenes = await Almacen.find({estado: 'ACTIVO'});
                return almacenes.sort(function(a, b){
                    if(a.nombre > b.nombre){
                        return 1
                    }
                    if(a.nombre < b.nombre){
                        return -1
                    }
                    return 0;
                });
            } catch (error) {
                return error;
            }
        },
        obtenerAlmacen: async (_, {id}) => {
            try{
                const almacen = await Almacen.findById(id);
                return almacen;
            }catch(error){
                console.log(error);
                return error;
            }
        }
    },
    Mutation: {
        insertarAlmacen: async (_, { input }) => {
            try {
                const { nombre } = input;
                const existe = await Almacen.findOne({ nombre });
                if (existe) {
                    return {
                        estado: true,
                        data: null,
                        message: "El almacén ya existe"
                    };
                } else {
                    const almacen = new Almacen(input);
                    const result = await almacen.save();
                    return {
                        estado: true,
                        data: result,
                        message: "Almacén creado con exito"
                    }
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al registrar el almacén"
                };
            }
        },
        actualizarAlmacen: async (_, { id, input }) => {
            try {
                const almacen = await Almacen.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: almacen,
                    message: "Almacén actualizado correctamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar el almacén"
                };
            }
        },
        desactivarAlmacen: async (_, { id }) => {
            try {
                const rol = await Almacen.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (rol) {
                    return {
                        estado: true,
                        data: null,
                        message: "Almacén eliminado correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar el almacén"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al eliminar el almacén"
                };
            }
        }
    }
}