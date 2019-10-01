class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {
        let persona = {
            id,
            nombre,
            sala
        };

        this.personas.push(persona);
        return persona;
    }

    getPersona(id) {
        let persona = this.personas.find(persona => persona.id === id);
        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonaPorSala(idSala) {
        let personas = this.personas.filter(persona => persona.sala === idSala);
        return personas;
    }

    borrarPersona(id) {
        const borrada = this.getPersona(id);
        this.personas.filter(persona => persona.id !== id);
        return borrada;
    }
}

module.exports = {
    Usuarios
}