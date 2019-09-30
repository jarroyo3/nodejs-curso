var socket = io();

socket.on('connect', function() {
    console.log('conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
});

// enviar informacion
socket.emit('enviarMensaje', {
    usuario: 'Jorge',
    mensaje: 'Holaaaa'
}, function(respuesta) {
    console.log('Respuesta del servidor:', respuesta);
});

socket.on('enviarMensajeServidor', function(mensaje) {
    console.log(mensaje);
});