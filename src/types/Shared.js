const { gql } = require('apollo-server-express');

const shared = gql`
    enum Estado{
        ACTIVO
        INACTIVO
    }

    type Email{
        email: String
    }

    type RedSocial{
        red: String
        enlace: String
    }

    type Telefono{
        telefono: String,
        descripcion: String,
        extension: String
    }

    input EmailInput{
        email: String
    }

    input RedSocialInput{
        red: String
        enlace: String
    }

    input TelefonoInput{
        telefono: String,
        descripcion: String,
        extension: String
    }

    type MateriaPrimaMovimientos{
        materia_prima: MateriaPrima
        movimientos: [MovimientosType]
    }

    type ActivoMovimientos{
        activo: Activo
        movimientos: [MovimientosActivoType]
    }
`;

module.exports = shared;