const mongoose = require('mongoose')
const createError = require('http-errors');

const Sale = require('../Models/Sale.model');


module.exports = {
    getAllSales: async (req, res, next) => {
        try {
            const results = await Sale.find({}, { __v: 0 })
            res.send("Sales Endpoint");
        } catch (error) {
            console.log(error.message)
        }
    },

    createNewSale: async (req, res, next) => {

        try {
            const sale = new Sale(req.body);
            const result = await sale.save();
            res.send(result);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            console.log(error.message);
        }
    },

    findSaleById: async (req, res, next) => {
        const id = req.params.id;

        try {
            const sale = await Sale.findById(id);

            if (!sale) {
                throw createError(404, "Sale doesn't exist.");
            }

            res.send(sale);
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Sale"))
                return;
            }
            next(error)
        }
    },

    updateSaleById: async (req, res, next) => {
        const id = req.params.id;
        const updates = req.body;

        try {
            const sale = await Sale.findByIdAndUpdate(id, updates);

            if (!sale) {
                throw createError(404, "Sale doesn't exist.");
            }

            res.send(sale);
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Sale"))
                return;
            }
            next(error)
        }
    },

    deleteSaleById: async (req, res, next) => {
        const id = req.params.id;

        try {
            const sale = await Sale.findByIdAndDelete(id);

            if (!sale) {
                throw createError(404, "Sale doesn't exist.");
            }

            res.send(sale);
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Sale"))
                return;
            }
            next(error)
        }
    }
};