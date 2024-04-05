import { TransferenciaInterna, TransferenciaInternaLinea, AlmacenLinea } from "../models";

export default {
    Query: {
        obtenerTransferenciasInternas: async (_, { }) => {
            try {
                const transferencias = await TransferenciaInterna.find().populate('usuario').populate('almacenDesde').populate('almacenHasta');
                return transferencias.sort(function(a, b){
                    if(a.fecha < b.fecha){
                        return 1
                    }
                    if(a.fecha > b.fecha){
                        return -1
                    }
                    return 0;
                });
            } catch (error) {
                return error;
            }
        },
        obtenerTransferenciaInterna: async (_, {id}) => {
            try{
                const transferencia = await TransferenciaInterna.findById(id).populate('usuario').populate('almacenDesde').populate('almacenHasta');
                return transferencia;
            }catch(error){
                console.log(error);
                return error;
            }
        }
    },
    Mutation: {
        insertarTransferenciaInterna: async (_, { input, lineas }) => {
            try {
                // Crea transferencia
                const transferencia = new TransferenciaInterna(input);
                const result = await transferencia.save();
                if(result){
                    for(let i=0; i<lineas.length; i++){

                        // ----------------------------
                        // Crea linea de transferencia
                        let lineaInput = {
                            ...lineas[i],
                            transferenciaInterna: result._id
                        }

                        const linea = new TransferenciaInternaLinea(lineaInput);
                        const resultLineaTrasferencia = await linea.save();
                        // ----------------------------

                        const materiaPrima = lineaInput.producto

                        // ----------------------------
                        // Salida de almacen
                        const cantidadDesde = lineaInput.cantidad
                        const almacenDesde = input.almacenDesde

                        const lineaAlmacenDesde = await AlmacenLinea.findOne({ almacen: almacenDesde, producto: materiaPrima });
                        let lineaAlmacenDesdeInputActualizacion = {
                            almacen: almacenDesde,
                            producto: materiaPrima,
                            cantidad: cantidadDesde
                        }
                        if (lineaAlmacenDesde) {
                            let canExistente = parseFloat(lineaAlmacenDesde.cantidad)
                            let canMenos = parseFloat(cantidadDesde)
                            if(canExistente <= 0 || (canExistente < canMenos)){
                                return {
                                    estado: false,
                                    data: null,
                                    message: "El almacén seleccionado no tiene existencias suficientes de este producto"
                                };
                            }

                            lineaAlmacenDesdeInputActualizacion.cantidad = canExistente - canMenos
                            const salidaAlmacen = await AlmacenLinea.findOneAndUpdate({ _id: lineaAlmacenDesde.id }, lineaAlmacenDesdeInputActualizacion, { new: true });
                        }else{
                            return {
                                estado: false,
                                data: null,
                                message: "El almacén seleccionado no tiene existencias de este producto"
                            };
                        }
                        // ----------------------------

                        // ----------------------------
                        // Ingreso de almacen

                        
                        const cantidadHasta = lineaInput.cantidad
                        const almacenHasta = input.almacenHasta

                        const lineaAlmacenHasta = await AlmacenLinea.findOne({ almacen: almacenHasta, producto: materiaPrima });
                        let lineaAlmacenHastaInputActualizacion = {
                            almacen: almacenHasta,
                            producto: materiaPrima,
                            cantidad: cantidadHasta
                        }
                        if (lineaAlmacenHasta) {
                            lineaAlmacenHastaInputActualizacion.cantidad = parseFloat(lineaAlmacenHasta.cantidad) + parseFloat(cantidadHasta)
                            const ingresoAlmacen = await AlmacenLinea.findOneAndUpdate({ _id: lineaAlmacenHasta.id }, lineaAlmacenHastaInputActualizacion, { new: true });
                        } else {
                            const lineaNuevaAlmacenHasta = new AlmacenLinea(lineaAlmacenHastaInputActualizacion);
                            const ingresoAlmacen = await lineaNuevaAlmacenHasta.save();
                        }
                        

                        // ----------------------------
                    }

                    return {
                        estado: true,
                        data: null,
                        message: "Transferencia interna registrada exitosamente"
                    };
                }
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al registrar la transferencia interna"
                };

                
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al registrar la transferencia interna"
                };
            }
        },
        actualizarTransferenciaInterna: async (_, { id, input }) => {
            try {
                const transferencia = await TransferenciaInterna.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: transferencia,
                    message: "Transferencia interna actualizada correctamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar la transferencia interna"
                };
            }
        }
    }
}