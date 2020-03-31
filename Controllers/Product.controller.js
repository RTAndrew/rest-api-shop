const mongoose = require('mongoose')
const createError = require('http-errors');

const Product = require('../Models/Product.model');


module.exports = {
    getAllProducts: async (req, res, next) => {
        try {
            const results = await Product.find({}, { __v: 0 })
            res.send(results);
        } catch (error) {
            console.log(error.message)
        }
    },

    createNewProduct: async (req, res, next) => {

        try {
            const product = new Product(req.body);
            const result = await product.save();
            res.send(result);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            console.log(error.message);
        }
    },

    findProductById: async (req, res, next) => {
        const id = req.params.id;

        try {
            const product = await Product.findById(id);

            if (!product) {
                throw createError(404, "Product doesn't exist.");
            }

            res.send(product);
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Product"))
                return;
            }
            next(error)
        }
    }, 

    updateProductById: async (req, res, next) => {
        const id = req.params.id;
        const updates = req.body;

        try {
            const product = await Product.findByIdAndUpdate(id, updates);

            if (!product) {
                throw createError(404, "Product doesn't exist.");
            }

            res.send(product);
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Product"))
                return;
            }
            next(error)
        }
    },

    deleteProductById: async (req, res, next) => {
        const id = req.params.id;

        try {
            const product = await Product.findByIdAndDelete(id);

            if (!product) {
                throw createError(404, "Product doesn't exist.");
            }

            res.send(product);
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Product"))
                return;
            }
            next(error)
        }
    }
};