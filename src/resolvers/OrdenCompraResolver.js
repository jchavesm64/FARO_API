import { LineasRecepcionProductos, OrdenCompra, RecepcionProductos } from '../models';
import LineaOrdenCompra from '../models/LineaOrdenCompra';
import mongoose from 'mongoose';
import ModuloConsecutivoResolver from './ModuloConsecutivoResolver';

const { generarConsecutivo } = ModuloConsecutivoResolver.Mutation;

export default {
    Query: {
        obtenerOrdenesCompra: async (_, { filtro }) => {
            try {
                const ordenes = await OrdenCompra.find({ estado: 'ACTIVO' })
                    .populate({ path: 'consecutivo' })
                    .populate('proveedor')
                    .populate('lineasPedido')
                    .sort({ fechaPedido: -1, consecutivo: -1 });

                return ordenes;
            } catch (error) {
                return error;
            }
        },
        obtenerOrdenCompra: async (_, { id }) => {
            try {
                const orden = await OrdenCompra.findById(id).populate({ path: 'consecutivo' }).populate({ path: 'proveedor' }).populate({
                    path: 'lineasPedido', populate: {
                        path: 'producto impuesto'
                    }
                }).exec();

                return orden;
            } catch (error) {

            }
        }
    },
    Mutation: {
        insertarOrdenCompra: async (_, { input, inputLineas }) => {
            try {
                const consecutivo = await generarConsecutivo(_, { input: { modulo: "orden de compra", cedula: input.cedula } });
                if (!consecutivo.estado) {
                    return {
                        estado: false,
                        data: null,
                        message: consecutivo.message
                    }
                }
                input.consecutivo = consecutivo.data.id;
                delete input.cedula;
                const orden = new OrdenCompra(input);
                const result = await orden.save();
                let lineasIds = []

                for (let i = 0; i < inputLineas.length; i++) {
                    const linea = new LineaOrdenCompra({
                        ...inputLineas[i],
                        _id: new mongoose.Types.ObjectId()
                    })
                    const lineaCreated = await linea.save()
                    lineasIds.push(lineaCreated._id)
                }

                await OrdenCompra.findOneAndUpdate({ _id: orden._id }, {
                    lineasPedido: lineasIds
                }, { new: true });
                return {
                    estado: true,
                    data: result,
                    message: "La orden fue registrada con éxito"
                };
            } catch (error) {
                console.log(error)
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al registrar la orden"
                };
            }
        },
        actualizarOrdenCompra: async (_, { id, input, inputLineasEditar }) => {
            try {
                const orden = await OrdenCompra.findById(id).populate({ path: 'proveedor' }).populate({
                    path: 'lineasPedido', populate: {
                        path: 'producto impuesto'
                    }
                }).exec();

                const lineasOrden = orden.lineasPedido

                let lineasOrdenEditar = []
                let lineasToDelete = []

                for (let i = 0; i < lineasOrden.length; i++) {
                    const find = inputLineasEditar.find(l => l.id && l.id === lineasOrden[i].id)
                    if (!find) {
                        lineasToDelete.push(lineasOrden[i].id)
                    } else {
                        lineasOrdenEditar.push(find.id)
                    }
                }

                const lineasToCreate = inputLineasEditar.filter(l => !l.id || l.id === null)

                for (let i = 0; i < lineasToCreate.length; i++) {
                    const linea = new LineaOrdenCompra({
                        ...lineasToCreate[i].linea,
                        _id: new mongoose.Types.ObjectId()
                    })
                    const lineaCreated = await linea.save()
                    lineasOrdenEditar.push(lineaCreated._id)
                }

                for (let i = 0; i < lineasToDelete.length; i++) {
                    await LineaOrdenCompra.deleteOne({ _id: lineasToDelete[i].id })
                }

                const lineasToUpdate = inputLineasEditar.filter(l => l.id && l.id !== null)

                for (let i = 0; i < lineasToUpdate.length; i++) {
                    await LineaOrdenCompra.findOneAndUpdate({ _id: lineasToUpdate[i].id }, lineasToUpdate[i].linea, { new: true })
                }

                input = {
                    ...input,
                    lineasPedido: lineasOrdenEditar
                }

                let ordenUpdated = await OrdenCompra.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: orden,
                    message: "La orden fue actualizada con éxito"
                };

            } catch (error) {
                console.log(error);
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al actualizar la orden"
                };
            }
        },
        actualizarEstadoOrdenCompra: async (_, { id, estado }) => {
            try {
                const orden = await OrdenCompra.findOneAndUpdate({ _id: id }, { 'estadoPedido': estado }, {
                    new: true
                }).populate({ path: 'proveedor' }).populate({
                    path: 'lineasPedido', populate: {
                        path: 'producto impuesto'
                    }
                }).exec();

                if (estado === 'Confirmado') {
                    const recepcionInput = {
                        estado: 'ACTIVO',
                        proveedor: orden.proveedor,
                        pedido: orden._id,
                        fechaPedido: orden.fechaPedido,
                        estadoRecepcion: 'Borrador',
                        subtotal: orden.subtotal,
                        impuestosMonto: orden.impuestosMonto,
                        total: orden.total,
                    }
                    const recepcion = new RecepcionProductos(recepcionInput);

                    const res = await recepcion.save();

                    if (res) {
                        for (let i = 0; i < orden.lineasPedido.length; i++) {
                            const lineaPedido = orden.lineasPedido[i]
                            const inputLineaRecepcion = {
                                estado: 'ACTIVO',
                                producto: lineaPedido.producto._id,
                                recepcion: res._id,
                                impuesto: lineaPedido.impuesto && lineaPedido.impuesto !== null ? lineaPedido.impuesto._id : null,
                                precioUnitario: lineaPedido.precioUnitario,
                                cantidadSolicitada: lineaPedido.cantidad,
                                cantidadRecibida: 0,
                                porcentajeDescuento: lineaPedido.porcentajeDescuento,
                                descuento: lineaPedido.descuento,
                                montoImpuestos: lineaPedido.montoImpuestos,
                                subtotalSinImpuesto: lineaPedido.subtotalSinImpuesto,
                                subtotalConImpuesto: lineaPedido.subtotalConImpuesto,
                            }
                            const lineaRecepcion = new LineasRecepcionProductos(inputLineaRecepcion);
                            const resLineaRecepcion = await lineaRecepcion.save();
                        }
                    }
                }

                return {
                    estado: true,
                    data: orden,
                    message: "La orden fue actualizada con éxito"
                };
            } catch (error) {
                console.log(error);
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error al actualizar la orden"
                };
            }
        },
        desactivarOrdenCompra: async (_, { id }) => {
            try {
                const orden = await OrdenCompra.findOneAndUpdate({ _id: id }, { estado: "INACTIVO" }, { new: true });
                if (orden) {
                    return {
                        estado: true,
                        data: null,
                        message: "Orden eliminada correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar la orden"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrió un error inesperado al eliminar la orden"
                };
            }
        }
    }
}