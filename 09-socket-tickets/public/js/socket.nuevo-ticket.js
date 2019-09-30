var socket = io();

var labelNewTicket = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desonectado del servidor');
});

$('body').on('click', '#newTicket', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        labelNewTicket.html(siguienteTicket);
    });
})

socket.on('estadoActual', function(ticket) {
    labelNewTicket.html(ticket.actual)
});