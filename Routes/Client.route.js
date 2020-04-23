const express = require('express');
const router = express.Router();

const ClientController = require('../Controllers/Client.controller');


router.get('/', ClientController.getAllClients);

router.post('/', ClientController.createNewClient);

router.get('/:id', ClientController.findClientById)

router.patch('/:id', ClientController.updateClientById)

router.delete('/:id', ClientController.deleteClientById);





module.exports = router;