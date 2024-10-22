const { sequelize } = require('./models/Migracion');
const usuarioDAO = require('./dataAccess/userDAO');
const juegosDAO = require('./dataAccess/juegosDAO');
const compraDAO = require('./dataAccess/compraDAO');
const categoriaDAO = require('./dataAccess/categoriaDAO');
const categoriaJuegoDAO = require('./dataAccess/categoriaJuegoDAO');

const express = require('express');
const morgan = require('morgan');
const app = express(); // Corregir los paréntesis

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

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



//require('dotenv').config({path: 'RUTA'});
// const compraJuegosDAO = require('../dataAccess/compraJuegosDAO');

// Función asincrónica para realizar transacciones
async function realizarTransacciones() {
    try {
        // Iniciar una transacción en la base de datos
        await sequelize.sync();

        const usuario = await usuarioDAO.createUsuario({
            nombre: 'John Doeeee',
            correo: 'john@example.com',
            clave: 'password123'
        });

        const juego = await juegosDAO.createJuego({
            titulo: 'The Legend of Zelda: Breath of the Wild',
            descripcion: 'An action-adventure game',
            desarrollador: 'Nintendo',
            fecha_lanzamiento: new Date('2017-03-03'),
            precio: 59.99
        });

        const juego2 = await juegosDAO.createJuego({
            titulo: 'The Legend of Zelda 2: Breath of the Wild',
            descripcion: 'An action-adventure game',
            desarrollador: 'Nintendo',
            fecha_lanzamiento: new Date('2017-03-03'),
            precio: 69.99
        });

        const categoryAction = await categoriaDAO.createCategoria({
            nombre: 'Action',
            descripcion: 'Games with emphasis on combat and movement'
        });

        const categoriaJuego = await categoriaJuegoDAO.createCategoriaJuego({
            juegoId: juego.id,
            categoriaId: categoryAction.id,
        });

        const categoriaJuego2 = await categoriaJuegoDAO.createCategoriaJuego({
            juegoId: juego2.id,
            categoriaId: categoryAction.id,
        });

        const compra = await compraDAO.createCompra({
            usuarioId: usuario.id,
            juegoId: juego.id,
            precio_compra: juego.precio,
        });

        const compraJuego = await compraJuegosDAO.createCompraJuego({
            compraId: compra.id,
            juegoId: juego.id,
        });

        const compra2 = await compraDAO.createCompra({
            usuarioId: usuario.id,
            juegoId: [juego.id, juego2.id],
            precio_compra: juego.precio + juego2.precio,
        });

        const compraJuego2 = await compraJuegosDAO.createCompraJuego({
            compraId: compra2.id,
            juegoId: juego2.id,
        });


        console.log('********************************************************')
        console.log('Se creo exitosamente el usuario: ', usuario);
        console.log('Se creo exitosamente el juego: ', juego);
        console.log('Se creo exitosamente la categoria: ', categoryAction);
        console.log('Se creo exitosamente la relacion: ', categoriaJuego);
        console.log('Se creo exitosamente la relacion2: ', categoriaJuego2);
        console.log('Se creo exitosamente la compra: ', compra);
        console.log('Se creo exitosamente la relacion compra - juego: ', compraJuego);
        console.log('Se creo exitosamente la relacion compra - juego 2 : ', compraJuego2);
        console.log('Se creo exitosamente la compra con varios items: ', compra2);
        console.log('********************************************************')

        // const compraJuego = await compraJuegosDAO.createCompraJuego();

    } catch (error) {
        console.error('Error en las transacciones:', error);
    } finally {
        // Cerrar la conexión a la base de datos cuando todas las transacciones han terminado
        await sequelize.close();
    }
}

// Ejecutar las transacciones
//realizarTransacciones();


// Levanta el servidor gg
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
