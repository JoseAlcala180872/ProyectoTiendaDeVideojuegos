// const { sequelize } = require('./server/models/Migracion');
// const usuarioDAO = require('./dataAccess/userDAO');
// const juegosDAO = require('./dataAccess/juegosDAO');
// const compraDAO = require('./dataAccess/compraDAO');
// const categoriaDAO = require('./dataAccess/categoriaDAO');
// const categoriaJuegoDAO = require('./dataAccess/categoriaJuegoDAO');

const bodyParser = require('body-parser')
const path = require('path');

const express = require('express');
const morgan = require('morgan');
const viewController = require('./controllers/viewController.js');
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../view')));


const { globalErrorHandler, AppError } = require('./utils/appError.js');
const db = require('./config/config');
const categoriaRouter = require('./routes/categoriaRouter.js');
const juegosRouter = require('./routes/juegosRouter.js');
const usuarioRouter = require('./routes/usuarioRouter.js');
const compraRouter = require('./routes/compraRouter.js');
const viewRouter = require('./routes/viewRouter.js');
const compraJuegosDAO = require('./dataAccess/compraJuegosDAO');

// Rutas
app.use('/api/categorias', categoriaRouter);
app.use('/api/juegos', juegosRouter);
app.use('/api/usuarios', usuarioRouter);
app.use('/api/compras', compraRouter);
app.use('/', viewRouter);
// Middleware 2
app.use(globalErrorHandler);
// Default 404 not found page
app.use(viewController.getNotFound);


// Levanta el servidor gg
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
