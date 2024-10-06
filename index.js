const { Usuario, Compra, Juego, Categoria } = require('./models');

// 1. A user can have multiple compras, one compra can only belong to one user
async function userComprasExample() {
    // Create a user
    const user = await Usuario.create({
        nombre: 'John Doe',
        correo: 'john@example.com',
        contraseña: 'password123'
    });

    // Create compras for the user
    const compra1 = await Compra.create({
        precio_compra: 59.99,
        usuarioId: user.id
    });

    const compra2 = await Compra.create({
        precio_compra: 39.99,
        usuarioId: user.id
    });

    // Get all compras for a user
    const userCompras = await user.getCompras();
    console.log('User compras:', userCompras.map(c => c.precio_compra));

    // Get the user for a compra
    const compraUser = await compra1.getUsuario();
    console.log('Compra belongs to user:', compraUser.nombre);
}

// 2. Multiple juegos can belong in a compra, one juego can belong in multiple compras
async function comprasJuegosExample() {
    // Create juegos
    const juego1 = await Juego.create({
        titulo: 'Super Mario Odyssey',
        descripcion: 'A 3D platformer game',
        desarrollador: 'Nintendo',
        fecha_lanzamiento: new Date('2017-10-27'),
        precio: 59.99
    });

    const juego2 = await Juego.create({
        titulo: 'The Legend of Zelda: Breath of the Wild',
        descripcion: 'An action-adventure game',
        desarrollador: 'Nintendo',
        fecha_lanzamiento: new Date('2017-03-03'),
        precio: 59.99
    });

    // Create a compra with multiple juegos
    const compra = await Compra.create({
        precio_compra: 119.98,
        usuarioId: 1  // Assuming a user with id 1 exists
    });

    await compra.addJuegos([juego1, juego2]);

    // Get all juegos for a compra
    const compraJuegos = await compra.getJuegos();
    console.log('Compra juegos:', compraJuegos.map(j => j.titulo));

    // Get all compras for a juego
    const juego1Compras = await juego1.getCompras();
    console.log('Juego1 belongs to compras:', juego1Compras.map(c => c.id));
}

// 3. One juego can belong to many categories, one category can belong to many juegos
async function juegosCategoriesExample() {
    // Create categories
    const actionCategory = await Categoria.create({
        nombre: 'Action',
        descripcion: 'Games with emphasis on combat and movement'
    });

    const adventureCategory = await Categoria.create({
        nombre: 'Adventure',
        descripcion: 'Games focusing on exploration and puzzle-solving'
    });

    // Create a juego
    const juego = await Juego.create({
        titulo: 'The Legend of Zelda: Breath of the Wild',
        descripcion: 'An action-adventure game',
        desarrollador: 'Nintendo',
        fecha_lanzamiento: new Date('2017-03-03'),
        precio: 59.99
    });

    // Associate juego with multiple categories
    await juego.addCategorias([actionCategory, adventureCategory]);

    // Get all categories for a juego
    const juegoCategories = await juego.getCategorias();
    console.log('Juego categories:', juegoCategories.map(c => c.nombre));

    // Get all juegos for a category
    const actionJuegos = await actionCategory.getJuegos();
    console.log('Action category juegos:', actionJuegos.map(j => j.titulo));
}

// Run the examples
async function runExamples() {
    await userComprasExample();
    await comprasJuegosExample();
    await juegosCategoriesExample();
}

runExamples().catch(console.error);