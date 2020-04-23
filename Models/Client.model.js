const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    contacto: {
        type: String
    },
    endereco: {
        type: String
    },
    email: {
        type: String
    },
    nif: {
        type: String
    },
    nome_completo: {
        type: String,
        required: true
    },
});


const Client = mongoose.model('client', ClientSchema);
module.exports = Client;