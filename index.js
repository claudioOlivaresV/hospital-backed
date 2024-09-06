const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors')


const app = express();

app.use(cors())
dbConnection()

// rutas
app.get('/',  (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })

});

app.listen(process.env.PORT, ()=> {
    console.log('servidor corriendo puerto 3002');
  }
);