const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Usuario = require('./usuario')

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'Descripcion es necesaria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        required: [true, 'Usuario es necesario'],
        ref: Usuario
    },
    status: {
        type: Boolean,
        default: true
    },
});

categoriaSchema.methods.toJSON = function() {
    let category = this;
    let categoryObject = category.toObject();
    delete categoryObject.password;
    return categoryObject;
}

categoriaSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único.'
});

module.exports = mongoose.model('Categoria', categoriaSchema);