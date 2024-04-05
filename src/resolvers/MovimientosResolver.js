import { Movimientos, Cotizacion, AlmacenLinea } from '../models';
import mongoose from 'mongoose'
// import { google } from 'googleapis'
// import { Storage } from '@google-cloud/storage'
import path from 'path'
import { createReadStream } from 'fs';

export default {
    Query: {
        obtenerMovimientos: async (_, { id }) => {
            try {
                const mov = await Movimientos.find({ materia_prima: id }).populate('usuario').populate('materia_prima').populate('proveedor').populate('cliente').populate('almacen');
                return mov;
            } catch (error) {
                return error;
            }
        },
        obtenerMovimientos2: async (_, { id }) => {
            try {
                const mov = await Movimientos.find({ materia_prima: id, tipo: 'ENTRADA' }).populate('usuario').populate('materia_prima').populate('proveedor').populate('cliente').populate('almacen');
                for(var m in mov){
                    const result = await Movimientos.find({ lote: mov[m].lote, tipo: 'SALIDA', materia_prima: mov[m].materia_prima });
                    var cant = mov[m].cantidad
                    for(var r in result){
                        cant -= result[r].cantidad
                    }
                    mov[m].existencia = cant
                }
                return mov
            } catch (error) {
                return error;
            }
        }
    },
    Mutation: {
        insertarMovimiento: async (_, { input, almacen }) => {
            try {
                try {
                    const { materia_prima, cantidad } = input;
                    const existe = await AlmacenLinea.findOne({ almacen: almacen, producto: materia_prima });
                    let inputLinea = {
                        almacen,
                        producto: materia_prima,
                        cantidad
                    }
                    if (existe) {
                        inputLinea.cantidad = parseFloat(existe.cantidad) + parseFloat(cantidad)
                        const linea = await AlmacenLinea.findOneAndUpdate({ _id: existe.id }, inputLinea, { new: true });
                    } else {
                        const linea = new AlmacenLinea(inputLinea);
                        const result = await linea.save();
                    }
                } catch (error) {
                    return {
                        estado: false,
                        data: null,
                        message: "Ocurrio un error inesperado al registrar la línea"
                    };
                }

                const mov = new Movimientos(input);
                const result = await mov.save();

                return {
                    estado: true,
                    data: result,
                    message: "Se registro correctamente el movimiento"
                }
            } catch (error) {
                console.log(error)
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al registrar el movimiento"
                }
            }
        },
        insertarSalida: async (_, { input, almacen }) => {
            try {
                try {
                    const { materia_prima, cantidad } = input;
                    const existe = await AlmacenLinea.findOne({ almacen: almacen, producto: materia_prima });
                    let inputLinea = {
                        almacen,
                        producto: materia_prima,
                        cantidad
                    }
                    if (existe) {
                        let canExistente = parseFloat(existe.cantidad)
                        let canMenos = parseFloat(cantidad)
                        if(canExistente <= 0 || (canExistente < canMenos)){
                            return {
                                estado: false,
                                data: null,
                                message: "El almacén seleccionado no tiene existencias suficientes de este producto"
                            };
                        }

                        inputLinea.cantidad = canExistente - canMenos
                        const linea = await AlmacenLinea.findOneAndUpdate({ _id: existe.id }, inputLinea, { new: true });
                    }else{
                        return {
                            estado: false,
                            data: null,
                            message: "El almacén seleccionado no tiene existencias de este producto"
                        };
                    }
                } catch (error) {
                    return {
                        estado: false,
                        data: null,
                        message: "Ocurrió un error inesperado"
                    };
                }

                const mov = new Movimientos(input);
                const result = await mov.save();
                return {
                    estado: true,
                    data: null,
                    message: "Se registro correctamente la salida"
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al registrar la salida"
                }
            }
        },
        verificarExistencias: async (_, { input }) => {
            var band = false, message = ""
            try {
                const { items } = input
                items.map(item => {
                    const result = Movimientos.find({ materia_prima: item.id })
                    var total = 0;
                    result.map(r => {
                        if (r.tipo === 'ENTRADA') {
                            total += r.cantidad
                        } else {
                            total -= r.cantidad
                        }
                    })
                    if (total > item.cantidad) {
                        if (!band) {
                            band = true
                        }
                        message += "Falta material en: " + item.nombre + "\n"
                    }
                })
                if (band) {
                    return {
                        estado: 2,
                        message: message
                    }
                } else {
                    return {
                        estado: 1,
                        message: "Existe suficiente material para ejecutar la cotización"
                    }
                }
            } catch (error) {
                console.log(error)
                return {
                    estado: 3,
                    message: "Hubo un error al itentar verificar las existencias"
                }
            }
        },
    }
}