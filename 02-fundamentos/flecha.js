/* function sumar(a, b) {
    return a + b;
}
 */

/* let sumar = (a, b) => a + b; */

/* console.log(sumar(10, 20)); */

let saludar = () => `Hola Mundo`;

console.log(saludar());

let deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneracion',
    getNombre() {
        return `Nombre: ${this.nombre} Apellido: ${this.apellido} Poder: ${this.poder}`
    }
};

console.log(deadpool.getNombre());