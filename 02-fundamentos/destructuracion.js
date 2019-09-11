let deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneracion',
    getNombre: function() {
        return `Nombre: ${this.nombre} Apellido: ${this.apellido} Poder: ${this.poder}`
    }
}

let { nombre: primerNombre, apellido, poder } = deadpool;
console.log(primerNombre, apellido, poder);