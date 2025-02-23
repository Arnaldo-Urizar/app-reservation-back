require('dotenv').config()
const nodemailer = require('nodemailer')

const sendEmail = async(data, emailUser, emailPass)=>{

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: emailUser,
            pass: emailPass
        }
    })

    try {
        await transporter.sendMail({
            from :emailUser,
            to: data.email,
            subject: "Comprobante de Reserva",
            text: `Hola ${data.customer}! Ya tenes reservado tu lugar.
            📅 Día: ${data.date},
            🕒 Hora: ${data.time},
            🎯 Motivo: ${data.reason},
            👥 Personas: ${data.people}
            `    
        })
    } catch (e) {
        console.error("No se pudo completar a accion: ",e)
    }
}

module.exports = sendEmail