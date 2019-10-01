const crearMensaje = (nombrePersona, mensaje) => {

    return {
        nombrePersona,
        mensaje,
        fecha: new Date().getTime()

    }
}

module.exports = {
    crearMensaje
}