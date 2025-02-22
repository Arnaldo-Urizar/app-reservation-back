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
        const info = await transporter.sendMail({
            from :emailUser,
            to: data.email, // colocar correo cliente
            subject: "Comprobante de Reserva",
            text: `${data.customer} reservaste el
            Día: ${data.date},
            Hora: ${data.time},
            Motivo: ${data.reason},
            Personas: ${data.people}
            `    
        })
        console.log("Message sent:", info.messageId)       
    } catch (e) {
        console.error("No se pudo completar a accion: ",e)
    }
}

module.exports = sendEmail