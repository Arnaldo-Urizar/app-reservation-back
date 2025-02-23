const express = require('express')
const router = express.Router()
const {saveReservation} = require('../controllers/reservations.controller')

router.post('/form',saveReservation);

module.exports = router

