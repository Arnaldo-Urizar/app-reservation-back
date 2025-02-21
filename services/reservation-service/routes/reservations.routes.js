const express = require('express')
const router = express.Router()
const {reservation, saveReservation} = require('../controllers/reservations.controller')

router.get('/',reservation);
router.post('/form',saveReservation);

module.exports = router

