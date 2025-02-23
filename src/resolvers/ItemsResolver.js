import Items from "../models/Items";

export default {
    Query: {
        obtenerItems: async (_, { }) => {
            try {
                const items = await Items.find({estado: 'ACTIVO'});
                return items.sort(function(a, b){
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
        obtenerItem: async (_, {id}) => {
            try{
                const item = await Items.findById(id);
                return item;
            }catch(error){
                console.log(error);
                return error;
            }
        }
    },
    Mutation: {
        insertarItem: async (_, { input }) => {
            try {
                const { nombre } = input;
                const existe = await Items.findOne({ nombre });
                if (existe) {
                    return {
                        estado: true,
                        data: null,
                        message: "El item ya existe"
                    };
                } else {
                    const item = new Items(input);
                    const result = await item.save();
                    return {
                        estado: true,
                        data: result,
                        message: "Item creado con exito"
                    }
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al registro el item"
                };
            }
        },
        actualizarItem: async (_, { id, input }) => {
            try {
                const result = await Items.findByIdAndUpdate(id, input, { new: true });
                return {
                    estado: true,
                    data: result,
                    message: "Item actualizado con exito"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar el item"
                };
            }
        },
        desactivarItem: async (_, { id }) => {
            try {
                const result = await Items.findByIdAndUpdate(id, { estado: 'INACTIVO' }, { new: true });
                return {
                    estado: true,
                    data: result,
                    message: "Item desactivado con exito"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al desactivar el item"
                };
            }
        }
    }
};