const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleSchema = new Schema({
    loja_id: {
        type: Number,
        required: true
    },
    funcionario: {
        type: String,
        required: true
    },
    sale_amount: {
        type: Number,
        required: true
    },
    sale_items: {
        type: Number,
        required: true
    },
    products: [Schema.Types.Mixed],
});


const Sale = mongoose.model('sale', SaleSchema);
module.exports = Sale;