require('dotenv').config()
const express = require('express')
const cors = require('cors')
const reservationRouters = require('./routes/reservations.routes')

const app = express()

app.use(express.json()) //permite recibir json en soliciutdes
app.use(cors())
app.use(cors({ origin: "*", methods: "GET,POST" }));

const PORT = process.env.PORT;

app.use('/',reservationRouters)

app.listen(PORT,()=>{
    console.log(`listening in Port: ${PORT}. http://localhost:${PORT}`)
})
