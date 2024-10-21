const { sequelize } = require('./models/Migracion');
const usuarioDAO = require('./dataAccess/userDAO');
const juegosDAO = require('./dataAccess/juegosDAO');
const compraDAO = require('./dataAccess/compraDAO');
const categoriaDAO = require('./dataAccess/categoriaDAO');
const categoriaJuegoDAO = require('./dataAccess/categoriaJuegoDAO');

// Middlewares
app.use(express.json()); 
app.use(morgan('dev'));  
// Rutas
app.use('/api/categorias', categoriaRouter);
app.use('/api/juegos', juegosRouter); 
app.use('/api/usuarios', usuarioRouter); 
// Middleware 2
app.use(globalErrorHandler);

const express = require('express');
const app = express(); // Corregir los paréntesis
const morgan = require('morgan');
const { globalErrorHandler, AppError } = require('./utils/appError');
const db = require('./config/config'); // Corregir la ruta
const categoriaRouter = require('./routes/categoriaRouter');
const juegosRouter = require('./routes/juegosRouter'); 
const usuarioRouter = require('./routes/usuarioRouter'); 



//require('dotenv').config({path: 'RUTA'});
// const compraJuegosDAO = require('../dataAccess/compraJuegosDAO');

// Función asincrónica para realizar transacciones
async function realizarTransacciones() {
    try {
        // Iniciar una transacción en la base de datos
        await sequelize.sync();

        const usuario = await usuarioDAO.createUsuario({
            nombre: 'John Doe',
            correo: 'john@example.com',
            contraseña: 'password123'
        });

        const juego = await juegosDAO.createJuego({
            titulo: 'The Legend of Zelda: Breath of the Wild',
            descripcion: 'An action-adventure game',
            desarrollador: 'Nintendo',
            fecha_lanzamiento: new Date('2017-03-03'),
            precio: 59.99
        });

        const categoryAction = await categoriaDAO.createCategoria({
            nombre: 'Action',
            descripcion: 'Games with emphasis on combat and movement'
        });

        const categoriaJuego = await categoriaJuegoDAO.createCategoriaJuego({
            juegoId: juego.id,
            categoriaId: categoryAction.id,
        });

        const compra = await compraDAO.createCompra({
            usuarioId: usuario.id,
            juegoId: juego.id,
            precio_compra: juego.precio,
        });

        console.log('Se creo exitosamente el usuario: ', usuario);
        console.log('Se creo exitosamente el juego: ', juego);
        console.log('Se creo exitosamente la categoria: ', categoryAction);
        console.log('Se creo exitosamente la relacion: ', categoriaJuego);
        console.log('Se creo exitosamente la compra: ', compra);

        // const compraJuego = await compraJuegosDAO.createCompraJuego();

    } catch (error) {
        console.error('Error en las transacciones:', error);
    } finally {
        // Cerrar la conexión a la base de datos cuando todas las transacciones han terminado
        await sequelize.close();
    }
}

// Ejecutar las transacciones
realizarTransacciones();


// Levanta el servidor gg
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
