const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.port || 5000
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/api/saludo', (req,res)=>{
    res.status(200).json({"mensaje":"hola mundo"})
})

app.use('/api/tareas', require('./routes/tareasRoutes'))

app.use('/api/users', require('./routes/usersRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`))