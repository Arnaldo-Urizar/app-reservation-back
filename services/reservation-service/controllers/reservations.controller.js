require('dotenv').config();  
const authConfig = require("../config/googleApis.config")
const AddReservation = require("../services/googleSheets.services")

const saveReservation = async (req,res)=>{
    const data = req.body

    const isEmpty = (data)=>{
        return Object.values(data).some(value => !value)
    }

    try {
        if(isEmpty(data)){
            res.status(400).send({message: 'Faltan campos obligatorios'})
            return
        } 
        const reservationCreated = await AddReservation(authConfig,data)

        const response = await fetch (`${process.env.NOTIFICATIONS_SERVICE_URL}/sendemail`,({
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reservationCreated)
        }))
        if (!response.ok) {
            throw new Error('Error al enviar el correo');
        }
        res.status(201).send({message:'solicitud exitósa', state: true});  
             
    } catch (e) {
        res.status(500).send({message: 'No se pudo completar la solicitud'})
    }
}

module.exports = {saveReservation}