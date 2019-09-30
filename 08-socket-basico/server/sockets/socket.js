const { io } = require('../server')

io.on('connection', (client) => {
    console.log('Usuario conectado');

    client.emit('enviarMensajeServidor', {
        usuario: 'Admin',
        mensaje: 'Trabaja!!'
    })

    client.on('disconnect', () => {
        console.log('Perdimos la conexión');
    });

    // escuchar el cliente
    client.on('enviarMensaje', (data, callback) => {
        console.log('Servidor', data);
        client.broadcast.emit('enviarMensaje', data)

        // if (data.usuario) {
        //     callback({
        //         respuesta: 'Todo salió bien'
        //     });
        // } else {
        //     callback({
        //         respueta: 'Hubo un error en el servidor'
        //     })
        // }
    })
});