const express = require('express');
const router = express.Router();
const {createDriver, readDriver, updateDriver, deleteDriver} = require('../../controllers/driver_controller')

//localhost:3000/api/driver
router.post('/driver', createDriver)
router.get('/driver', readDriver)
router.put('/driver/:id', updateDriver)
router.delete('/driver/:id', deleteDriver)

module.exports = router