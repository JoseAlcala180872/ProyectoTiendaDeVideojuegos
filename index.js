const { sequelize } = require('./models/Migracion');
const usuarioDAO = require('./dataAccess/userDAO');
const juegosDAO = require('./dataAccess/juegosDAO');
const compraDAO = require('./dataAccess/compraDAO');
const categoriaDAO = require('./dataAccess/categoriaDAO');
const categoriaJuegoDAO = require('./dataAccess/categoriaJuegoDAO');

const bodyParser = require('body-parser')

const express = require('express');
const morgan = require('morgan');
const app = express(); // Corregir los paréntesis

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json())


const { globalErrorHandler, AppError } = require('./utils/appError');
const db = require('./config/config'); // Corregir la ruta
const categoriaRouter = require('./routes/categoriaRouter');
const juegosRouter = require('./routes/juegosRouter');
const usuarioRouter = require('./routes/usuarioRouter');
const compraRouter = require('./routes/compraRouter');
const compraJuegosDAO = require('./dataAccess/compraJuegosDAO');

// Rutas
app.use('/api/categorias', categoriaRouter);
app.use('/api/juegos', juegosRouter);
app.use('/api/usuarios', usuarioRouter);
app.use('/api/compras', compraRouter);
// Middleware 2
app.use(globalErrorHandler);


// Levanta el servidor gg
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
