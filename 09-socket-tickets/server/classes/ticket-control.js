const fs = require('fs')

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatroTickets = [];

        const data = require('../data/data')
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatroTickets = data.ultimosCuatroTickets;

        } else {
            this.reiniciarConteo();
        }
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatroTickets = [];
        this.grabarArchivo();
    }

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimosCuatroTicket() {
        return this.ultimosCuatroTickets;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimosCuatroTickets.unshift(atenderTicket);

        if (this.ultimosCuatroTickets.length > 4) {
            this.ultimosCuatroTickets.splice(-1, 1); // borra el ultimo elemento del array
        }
        console.log('Ultimos 4 ticket', this.ultimosCuatroTickets);
        this.grabarArchivo();
        return atenderTicket;
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatroTickets: this.ultimosCuatroTickets
        };

        let stringJson = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', stringJson);
        console.log('Sistema reinicializado');
    }
}
module.exports = {
    TicketControl
}