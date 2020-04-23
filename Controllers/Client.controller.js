const mongoose = require('mongoose')
const createError = require('http-errors');

const Client = require('../Models/Client.model');


module.exports = {
    getAllClients: async (req, res, next) => {
        try {
            const results = await Client.find({}, { __v: 0 })
            res.send(results);
        } catch (error) {
            console.log(error.message)
        }
    },

    createNewClient: async (req, res, next) => {

        try {
            const client = new Client(req.body);
            const result = await client.save();
            res.send(result);
        } catch (error) {
            if (error.name === 'ValidationError') {
                next(createError(422, error.message));
                return;
            }
            console.log(error.message);
        }
    },

    findClientById: async (req, res, next) => {
        const id = req.params.id;

        try {
            const client = await Client.findById(id);

            if (!client) {
                throw createError(404, "Client doesn't exist.");
            }

            res.send(client);
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Client"))
                return;
            }
            next(error)
        }
    },

    updateClientById: async (req, res, next) => {
        const id = req.params.id;
        const updates = req.body;

        try {
            const client = await Client.findByIdAndUpdate(id, updates);

            if (!client) {
                throw createError(404, "Client doesn't exist.");
            }

            res.send(client);
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Client"))
                return;
            }
            next(error)
        }
    },

    deleteClientById: async (req, res, next) => {
        const id = req.params.id;

        try {
            const client = await Client.findByIdAndDelete(id);

            if (!client) {
                throw createError(404, "Client doesn't exist.");
            }

            res.send(client);
        } catch (error) {
            console.log(error.message)
            if (error instanceof mongoose.CastError) {
                next(createError(400, "Invalid Client"))
                return;
            }
            next(error)
        }
    }
};