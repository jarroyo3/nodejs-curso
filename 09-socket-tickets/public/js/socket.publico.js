var socket = io();

var lblTicket1 = $('#lblTicket1')
var lblTicket2 = $('#lblTicket2')
var lblTicket3 = $('#lblTicket3')
var lblTicket4 = $('#lblTicket4')


var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1,
    lblTicket2,
    lblTicket3,
    lblTicket4
];
var lblEscritorios = [lblEscritorio1,
    lblEscritorio2,
    lblEscritorio3,
    lblEscritorio4
];

socket.on('estadoActual', function(tickets) {
    actualizaHTML(tickets.ultimosCuatro)
})

socket.on('ultimosCuatro', function(tickets) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(tickets.ultimosCuatro)
})

function actualizaHTML(ultimosCuatroTickets) {
    for (let i = 0; i < ultimosCuatroTickets.length; i++) {
        lblTickets[i].text('Ticket ' + ultimosCuatroTickets[i].numero)
        lblEscritorios[i].text('Escritorio ' + ultimosCuatroTickets[i].escritorio)

    }
}