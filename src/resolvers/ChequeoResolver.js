import { Chequeo, PuestoLimpieza } from "../models";

export default {
    Query: {
        obtenerChequeos: async (_, { id, fecha1, fecha2 }) => {
            try {
                const chequeos = await Chequeo.find({ puesto_limpieza: id, $and: [{ fecha: { $gte: fecha1 } }, { fecha: { $lte: fecha2 } }] }).populate('puesto_limpieza')
                return chequeos
            } catch (error) {
                return error
            }
        },
        obtenerTodosChequeos: async (_, { id, fecha1, fecha2 }) => {
            try {
                const chequeos = await Chequeo.find({ }).populate('puesto_limpieza').populate('usuario')
                return chequeos.sort(function(a, b){
                    if(a.fecha < b.fecha){
                        return 1
                    }
                    if(a.fecha > b.fecha){
                        return -1
                    }
                    return 0;
                });
            } catch (error) {
                return error
            }
        },
        obtenerChequeoId: async (_, { id }) => {
            try {
                let chequeo = await Chequeo.findById(id).populate('puesto_limpieza').populate('usuario')
                return chequeo
            } catch (error) {
                console.log(error);
                return error
            }
        }
    },
    Mutation: {
        insertarChequeo: async (_, { input }) => {
            try {
                const { puesto_limpieza, fecha } = input
                const chequeo_find = await Chequeo.findOne({ puesto_limpieza: puesto_limpieza, fecha: { $eq: fecha } })
                if (chequeo_find) {
                    await Chequeo.findOneAndUpdate({ _id: chequeo_find.id }, input, { new: true });
                    return {
                        estado: true,
                        message: 'El chequeo fue actualizada correctamente'
                    }
                } else {
                    const chequeo = new Chequeo(input)
                    await chequeo.save()
                    return {
                        estado: true,
                        message: 'El chequeo fue registrado correctamente'
                    }
                }
            } catch (error) {
                return {
                    estado: false,
                    message: "Ocurrio un error al registrar el producto"
                };
            }
        },
        aprobarChequeo: async (_, { id }) => {
            try {
                const chequeo = await Chequeo.findOneAndUpdate({ _id: id }, { aprobado: true }, { new: true })
                if (chequeo) {
                    return {
                        estado: true,
                        data: null,
                        message: "Chequeo marcado como revisado correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo marcar como revisado el chequeo"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    message: "Ocurrio un error al revisar el chequeo"
                }
            }
        },
        
        obtenerChequeo: async (_, { id, fecha }) => {
            try {
                let chequeo = await Chequeo.findOne({ puesto_limpieza: id, fecha: { $eq: fecha } }).populate('puesto_limpieza').populate('usuario')
                if (chequeo) {
                    console.log(chequeo);
                    return {
                        chequeo: chequeo,
                        estado: 1
                    }
                }

                const puesto = await PuestoLimpieza.findById(id);
                const areas = puesto.areas.map(area=>{
                    return {
                        area: area.nombre,
                        estado: false
                    }
                })

                const input = {
                    puesto_limpieza: id,
                    areas,
                    fecha,
                    aprobado: false,
                    fechaRegistro: new Date()
                }
                
                const chequeoInput = new Chequeo(input)
                chequeo = await chequeoInput.save();
                console.log(chequeo);
                return {
                    chequeo: chequeo,
                    estado: 1
                }
            } catch (error) {
                console.log(error);
                return {
                    chequeo: null,
                    estado: 3
                }
            }
        },
    }
}