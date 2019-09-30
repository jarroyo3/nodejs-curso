var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio')
var label = $('small');

$('#escritorioTitle').text('Escritorio ' + escritorio)
$('button').on('click', function() {
    socket.emit('atenderTicket', {
        escritorio: escritorio
    }, function(ticket) {
        if (ticket.err) {
            label.text(ticket.message)
            return;
        }
        label.text('Ticket ' + ticket.numero)
        console.log(ticket);
    })
})