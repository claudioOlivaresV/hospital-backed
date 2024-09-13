const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors')


const app = express();

app.use(cors())

//lectura y parseo del body

app.use(express.json())
dbConnection()
// rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/login', require('./routes/auth'))
app.use('/api/hospitales', require('./routes/hospitales'))
app.use('/api/medicos', require('./routes/medicos'))
app.use('/api/todo', require('./routes/busquedas'))








app.listen(process.env.PORT, ()=> {
    console.log('servidor corriendo puerto 3002');
  }
);