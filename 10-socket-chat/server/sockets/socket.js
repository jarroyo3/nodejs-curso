const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios')
const { crearMensaje } = require('../utilidades/utils')
const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (usuario, callback) => {
        if (!usuario.nombre || !usuario.sala) {
            return callback({
                err: true,
                message: 'Nombre no definido'
            })
        }

        client.join(usuario.sala);

        let persona = usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala)

        client.to(usuario.sala).emit('listaPersona', usuarios.getPersonaPorSala(persona.sala))
        callback(usuarios.getPersonaPorSala(usuario.sala));
    })

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(usuario.sala).emit('crearMensaje', crearMensaje(`'Administrador`, `${personaBorrada.nombre} salió`))
        client.broadcast.to(usuario.sala).emit('listaPersona', usuarios.getPersonaPorSala(personaBorrada.sala))

        console.log('borrada persona', personaBorrada);
    })

    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(client.id)
        let mensaje = crearMensaje(persona.nombre, data.mensaje)
        client.broadcast.to(usuario.sala).emit('crearMensaje', mensaje)
    })

    client.on('mensajePrivado', (data) => {

        const id = client.id;
        if (!id) {
            return new Error('No se pudo mandar el mensaje privado')
        }

        const persona = usuarios.getPersona(id)
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre))
    })
})