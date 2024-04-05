import { Menu, MenuLinea } from "../models";

export default {
    Query: {
        obtenerMenus: async (_, { }) => {
            try {
                const menus = await Menu.find({estado: 'ACTIVO'});
                return menus.sort(function(a, b){
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
        obtenerMenu: async (_, {id}) => {
            try{
                const menu = await Menu.findById(id);
                return menu;
            }catch(error){
                console.log(error);
                return error;
            }
        }
    },
    Mutation: {
        insertarMenu: async (_, { input, lineasInput }) => {
            try {
                const { nombre } = input;
                const existe = await Menu.findOne({ nombre });
                if (existe) {
                    return {
                        estado: true,
                        data: null,
                        message: "El platillo ya existe"
                    };
                } else {
                    const menu = new Menu(input);
                    const result = await menu.save();

                    for(let i=0; i<lineasInput.length; i++){
                        console.log(lineasInput[i]);
                        const linea = new MenuLinea({
                            ...lineasInput[i],
                            menu: result.id
                        })
                        await linea.save()
                    }

                    return {
                        estado: true,
                        data: result,
                        message: "Platillo creado con exito"
                    }
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al registrar el platillo"
                };
            }
        },
        actualizarMenu: async (_, { id, input }) => {
            try {
                const menu = await Menu.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: menu,
                    message: "Platillo actualizado correctamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar el platillo"
                };
            }
        },
        desactivarMenu: async (_, { id }) => {
            try {
                const menu = await Menu.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (menu) {
                    return {
                        estado: true,
                        data: null,
                        message: "Platillo eliminado correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar el platillo"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al eliminar el platillo"
                };
            }
        }
    }
}