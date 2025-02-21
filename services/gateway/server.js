require('dotenv').config();

const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors());

console.log("RESERVATION_SERVICE_URL:", process.env.RESERVATION_SERVICE_URL); // Verifica si se carga bien
 
app.use('/reservas', createProxyMiddleware({
    target: process.env.RESERVATION_SERVICE_URL, //Redirige la solicitud
    changeOrigin: true, // permite cambiar origen de la solicitud para evitar bloqueos de cors
    pathRewrite: {"^/reserva": ""}, // elimina el path actual antes de redirigir
}))

app.get('/',(req,res)=>{
    res.send('Gateway working')
})

app.listen(PORT,()=>{
    console.log(`Listening in http://localhost:${PORT}`)
})