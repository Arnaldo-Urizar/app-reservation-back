require('dotenv').config();  
const authConfig = require("../config/googleApis.config")
const AddReservation = require("../services/googleSheets.services")
const sendEmail = require('../../notifications-service/app')

const reservation = (req,res)=>{
    try{
        res.json({message: 'api funcionando'})   
    }catch(e){
        res.status(500).send({message: 'No se pudo completar la solicitud'})
    }
}

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
        const response = await AddReservation(authConfig,data)
        await sendEmail(response, process.env.EMAIL_USER, process.env.PASS)
        
        res.status(201).send({message:'solicitud exitósa', state: true});  
             
    } catch (e) {
        res.status(500).send({message: 'No se pudo completar la solicitud'})
    }
}

module.exports = {reservation,saveReservation}