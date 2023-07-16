import express from "express";
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import routes from './routes/index.js'
import dotenv from "dotenv"

dotenv.config()
const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// use express router
app.use('/', routes);
/* 8v3OlThrMTEx5j5y */


const CONNECTION_URL = "mongodb+srv://kabita:8v3OlThrMTEx5j5y@cluster0.vutzb7f.mongodb.net/?retryWrites=true&w=majority"

const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((e) => console.log(e))
