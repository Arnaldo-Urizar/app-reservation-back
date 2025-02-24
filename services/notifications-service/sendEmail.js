require('dotenv').config()
const nodemailer = require('nodemailer')

const emailUser = process.env.EMAIL_USER
const emailPass = process.env.PASS
console.log("email:", process.env.EMAIL_USER)

const sendEmail = async(req,res)=>{
    try {
        const data = req.body
        console.log(data)

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: emailUser,
                pass: emailPass
            }
        })

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
        return res.status(200).json({ message: "Correo enviado correctamente" });
    } catch (e) {
        console.error("No se pudo completar a accion: ",e)
        return res.status(500).json({ message: "Error al enviar el correo", error: e.message });

    }
}

module.exports = {sendEmail};
