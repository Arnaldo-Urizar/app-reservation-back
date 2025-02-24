require('dotenv').config()
const express = require('express');
const {sendEmail} = require('./sendEmail')
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post('/sendemail', sendEmail);

app.listen(PORT, () => {
    console.log(`Notificaciones service in operation`);
});