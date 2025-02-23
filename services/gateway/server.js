require('dotenv').config();
const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors());
 
app.use('/reservas', createProxyMiddleware({
    target: process.env.RESERVATION_SERVICE_URL, //Redirige la solicitud
    changeOrigin: true, // permite cambiar origen de la solicitud para evitar bloqueos de cors
    pathRewrite: {"^/reservas": ""}, // elimina el path actual antes de redirigir
}))

app.listen(PORT,()=>{
    console.log(`Listening in http://localhost:${PORT}`)
})