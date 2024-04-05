const { gql } = require('apollo-server-express');

const materia_prima_type = gql`
    scalar Date
    scalar Number
    scalar ID

    enum TipoMateriaPrima{
        Hotel
        Restaurante
        Tienda
    }   

    enum Unidad {
        Kilogramo
        Litro
        Unidades
    }

    type LineaImpuestos{
        impuesto: ID
        aplicaVentas: Boolean
        aplicaCompras: Boolean
    }

    input LineaImpuestosInput{
        impuesto: ID
        aplicaVentas: Boolean
        aplicaCompras: Boolean
    }

    type MateriaPrima{
        id: ID
        nombre: String
        pais: String
        unidad: Unidad
        existencias: Number
        estado: Estado
        tipo: TipoMateriaPrima
        referenciaInterna: String
        codigoBarras: String
        codigoCabys: String
        descripcion: String
        precioCompra: Number
        precioCostoPromedio: Number
        precioVenta: Number
        impuestos: [LineaImpuestos]
    }

    type MateriaPrimaConMovimientos{
        id: ID
        nombre: String
        pais: String
        unidad: Unidad
        existencias: Number
        estado: Estado
        tipo: TipoMateriaPrima
        referenciaInterna: String
        codigoBarras: String
        codigoCabys: String
        descripcion: String
        precioCompra: Number
        precioCostoPromedio: Number
        precioVenta: Number
        impuestos: [LineaImpuestos]
        movimientos: [MovimientosType]
    }

    type Query{
        obtenerMateriasPrimas(tipo:String): [MateriaPrima]
        obtenerTodasMateriasPrimas: [MateriaPrima]
        obtenerMateriaPrima(id:ID): MateriaPrimaConMovimientos
        obtenerMateriasPrimasConMovimientos(tipo:String): [MateriaPrimaMovimientos]
    }

    input MateriaPrimaInput{
        nombre: String
        pais: String
        unidad: Unidad
        existencias: Number
        estado: Estado
        tipo: TipoMateriaPrima
        referenciaInterna: String
        codigoBarras: String
        codigoCabys: String
        descripcion: String
        precioCompra: Number
        precioCostoPromedio: Number
        precioVenta: Number
        impuestos: [LineaImpuestosInput]
    }

    type RespuestaMateriaPrima{
        estado: Boolean
        data: MateriaPrima
        message: Date
    }

    type Mutation{
        insertarMateriaPrima(input:MateriaPrimaInput): RespuestaMateriaPrima
        actualizarMateriaPrima(id:ID, input:MateriaPrimaInput): RespuestaMateriaPrima
        desactivarMateriaPrima(id:ID): RespuestaMateriaPrima
    }
`;

module.exports = materia_prima_type;