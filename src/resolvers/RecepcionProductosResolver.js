import { AlmacenLinea, LineaOrdenCompra, LineasRecepcionProductos, Movimientos, OrdenCompra, RecepcionProductos, RegistroContable } from '../models';
import mongoose from 'mongoose';

export default {
    Query: {
        obtenerRecepcionPedidos: async (_, { filtro }) => {
            try {
                const pedidos = await RecepcionProductos.find({ estado: 'ACTIVO' }).populate('proveedor')
                    .populate({
                        path: 'pedido',
                        populate: {
                            path: 'consecutivo'
                        }
                    });
                return pedidos.sort(function (a, b) {
                    if (a.fechaPedido < b.fechaPedido) {
                        return 1
                    }
                    if (a.fechaPedido > b.fechaPedido) {
                        return -1
                    }
                    return 0;
                });
            } catch (error) {
                return error;
            }
        },
        obtenerRecepcionPedido: async (_, { id }) => {
            try {
                const pedido = await RecepcionProductos.findOne({ pedido: id }).populate('proveedor')
                    .populate({
                        path: 'pedido',
                        populate: {
                            path: 'consecutivo'
                        }
                    });
                return pedido;
            } catch (error) {

            }
        }
    },
    Mutation: {
        insertarRecepcionPedido: async (_, { input }) => {
            try {
                const { pedido } = input;
                const existe = await RecepcionProductos.findOne({ pedido: pedido });
                if (existe) {
                    return {
                        estado: true,
                        data: null,
                        message: "La orden de recepcion ya existe"
                    };
                } else {
                    const recepcion = new RecepcionProductos(input);
                    const result = await recepcion.save();
                    return {
                        estado: true,
                        data: result,
                        message: "Orden de recepcion creada con exito"
                    }
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al registro el rol"
                };
            }
        },
        actualizarRecepcionPedido: async (_, { id, input }) => {
            try {
                const recepcion = await RecepcionProductos.findOneAndUpdate({ _id: id }, input, { new: true });
                return {
                    estado: true,
                    data: recepcion,
                    message: "Orden de recepcion actualizada correctamente"
                };
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al actualizar la orden de recepcion"
                };
            }
        },
        desactivarRecepcion: async (_, { id }) => {
            try {
                const recepcion = await RecepcionProductos.findOneAndUpdate({ _id: id }, { estado: 'INACTIVO' }, { new: true });
                if (recepcion) {
                    return {
                        estado: true,
                        data: null,
                        message: "Orden de recepcion eliminada correctamente"
                    };
                } else {
                    return {
                        estado: false,
                        data: null,
                        message: "No se pudo eliminar la orden de recepcion"
                    };
                }
            } catch (error) {
                return {
                    estado: false,
                    data: null,
                    message: "Ocurrio un error inesperado al eliminar la orden de recepcion"
                };
            }
        },
        actualizarEstadoRecepcion: async (_, { id, estado }) => {
            try {

                const fecha = new Date()
                fecha.setHours(0, 0, 0, 0)
                const recepcion = await RecepcionProductos.findOneAndUpdate({ _id: id }, { 'estadoRecepcion': estado, 'fechaEntrega': fecha }, {
                    new: true
                });

                if (estado === 'Confirmado') {
                    const orden = await OrdenCompra.findById(recepcion.pedido).populate({ path: 'proveedor' }).populate({
                        path: 'lineasPedido', populate: {
                            path: 'producto impuesto'
                        }
                    }).exec();

                    let subtotal = 0
                    let impuestosMonto = 0


                    for (let i = 0; i < orden.lineasPedido.length; i++) {
                        const lineaPedido = orden.lineasPedido[i]
                        const lineaRecepcion = await LineasRecepcionProductos.findOne({ estado: 'ACTIVO', recepcion: id, producto: lineaPedido.producto._id }).populate('producto').populate('impuesto').populate('recepcion').populate('almacen');

                        let cantidadRecibida = lineaRecepcion.cantidadRecibida
                        let subtotalSinImpuestos = lineaPedido.precioUnitario * cantidadRecibida
                        let descuento = 0
                        if (lineaPedido.porcentajeDescuento !== null && lineaPedido.porcentajeDescuento > 0) {
                            descuento = subtotalSinImpuestos * (lineaPedido.porcentajeDescuento / 100)
                            subtotalSinImpuestos = subtotalSinImpuestos - descuento
                        }

                        let montoImpuestos = 0
                        if (lineaPedido.impuesto && lineaPedido.impuesto !== null) {
                            montoImpuestos = subtotalSinImpuestos * (lineaPedido.impuesto.valor / 100)
                        }
                        let subtotalConImpuesto = subtotalSinImpuestos + montoImpuestos

                        await LineaOrdenCompra.findOneAndUpdate({ _id: lineaPedido.id }, {
                            'descuento': descuento,
                            'cantidadRecibida': cantidadRecibida,
                            'descuento': descuento,
                            'subtotalSinImpuesto': subtotalSinImpuestos,
                            'montoImpuestos': montoImpuestos,
                            'subtotalConImpuesto': subtotalConImpuesto
                        }, { new: true })

                        const mov = new Movimientos({
                            'tipo': 'ENTRADA',
                            'cedido': false,
                            'proveedor': orden.proveedor._id,
                            'fecha': orden.fechaPedido,
                            'cantidad': cantidadRecibida,
                            'existencia': cantidadRecibida,
                            'precio': subtotalSinImpuestos,
                            'precio_unidad': lineaPedido.precioUnitario,
                            'moneda': 'Colón',
                            'materia_prima': lineaPedido.producto._id,
                            'almacen': lineaRecepcion.almacen._id
                        });

                        const mov_created = await mov.save();

                        subtotal += subtotalSinImpuestos
                        impuestosMonto += montoImpuestos

                        const existeLineaAlmacen = await AlmacenLinea.findOne({ almacen: lineaRecepcion.almacen._id, producto: lineaRecepcion.producto._id });
                        let inputLineaAlmacen = {
                            almacen: lineaRecepcion.almacen._id,
                            producto: lineaRecepcion.producto._id,
                            cantidad: lineaRecepcion.cantidadRecibida
                        }
                        if (existeLineaAlmacen) {
                            inputLineaAlmacen.cantidad = parseFloat(existeLineaAlmacen.cantidad) + parseFloat(lineaRecepcion.cantidadRecibida)
                            await AlmacenLinea.findOneAndUpdate({ _id: existeLineaAlmacen.id }, inputLineaAlmacen, { new: true });
                        } else {
                            const linea = new AlmacenLinea(inputLineaAlmacen);
                            const result = await linea.save();
                        }
                    }

                    let total = subtotal + impuestosMonto

                    await OrdenCompra.findOneAndUpdate({ _id: recepcion.pedido }, {
                        'estadoPedido': 'Recibido',
                        'subtotal': subtotal,
                        'impuestosMonto': impuestosMonto,
                        'total': total,
                    }, { new: true })

                    const registroContable = new RegistroContable({
                        fechaRegistro: fecha,
                        tipoRegistroContable: 'PAGAR',
                        estado: 'ACTIVO',
                        estadoRegistroContable: 'PENDIENTE',
                        referenciaID: orden._id,
                        referenciaNombre: 'ORDEN DE COMPRA',
                        referenciaModelo: 'ordenCompra',
                        proveedor: orden.proveedor._id,
                        monto: total
                    })
                    await registroContable.save()
                }

                return {
                    estado: true,
                    data: recepcion,
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
    }
}