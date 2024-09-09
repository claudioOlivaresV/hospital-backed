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






app.listen(process.env.PORT, ()=> {
    console.log('servidor corriendo puerto 3002');
  }
);