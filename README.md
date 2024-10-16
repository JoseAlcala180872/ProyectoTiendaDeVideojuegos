<h1 align="center">🎮 Proyecto Web - Tienda de videojuegos 🛒</h1>

<p align="center">
  - José Alcalá - 180872<br>
  - Rosalía Pérez - 233505<br>
  - Victor Torres - 205869<br>
</p>

## Justificación de la eleccion de la base de datos:
### Base de datos: MySQL

- **Características de MySQL**:
  -  MySQL permite definir relaciones entre tablas y soporta transacciones que aseguran la integridad de los datos durante operaciones como las compras.
 
- **Características del proyecto**:
  - La aplicación gestiona un sistema de compras de videojuegos que requiere un manejo de  relaciones entre usuarios, juegos y categorías, además se necesita mantener la integridad de los datos durante las transacciones, como registrar compras y asociarlas con usuarios y juegos.

## Modelo de datos:
### Diagrama Entidad-Relación 

![Diagrama Entidad-Relación](https://github.com/user-attachments/assets/7d664d90-5299-46e9-a2fa-39a6fb3fe222)

### Entidades

- **Usuario**: (nombre, correo, contraseña)
- **Compra**: (precio_compra, idjuegos)
- **Juego**: (descripcion, titulo, desarrollador, fecha_lanzamiento, precio)
- **Categoria**: (nombre, descripcion)
- **CategoriaJuego**: (idjuego, idcategoria)

## Operaciones implementadas por entidad:

### Usuario

- **Crear Usuario**: `createUsuario(usuarioData)` - Registra un nuevo usuario.
- **Obtener Usuario por ID**: `getProductById(usuarioId)` - Obtiene datos del usuario para autenticación.
- **Actualizar Usuario**: `updateProduct(usuarioId, usuarioData)` - Permite actualizar información del usuario.
- **Eliminar Usuario**: `deleteProduct(usuarioId)` - Elimina un usuario de la base de datos.

### Compra

- **Crear Compra**: `createCompra(compraData)` - Registra una nueva compra.
- **Obtener Compra por ID**: `getCompraById(compraId)` - Recupera información de una compra específica.
- **Actualizar Compra**: `updateCompra(compraId, compraData)` - Actualiza detalles de una compra.
- **Eliminar Compra**: `deleteCompra(compraId)` - Elimina una compra.

### Juego

- **Crear Juego**: `createJuego(juegoData)` - Agrega un nuevo juego a la base de datos.
- **Obtener Juego por ID**: `getJuegoById(juegoId)` - Recupera información específica de un juego.
- **Actualizar Juego**: `updateJuego(juegoId, juegoData)` - Actualiza la información de un juego.
- **Eliminar Juego**: `deleteJuego(juegoId)` - Elimina un juego.

### Categoria

- **Crear Categoria**: `createCategoria(categoriaData)` - Registra una nueva categoría.
- **Obtener Categoria por ID**: `getCategoriaById(categoriaId)` - Recupera información de una categoría específica.
- **Actualizar Categoria**: `updateCategoria(categoriaId, categoriaData)` - Modifica los datos de una categoría.
- **Eliminar Categoria**: `deleteCategoria(categoriaId)` - Elimina una categoría.

### CategoriaJuego

- **Crear CategoriaJuego**: `createCategoriaJuego(categoriaJuegoData)` - Registra la relación entre juegos y categorías.
- **Obtener CategoriaJuego**: `getCategoriaJuegoByIds(categoriaId, juegoId)` - Obtiene la relación de una categoría y un juego.
- **Eliminar CategoriaJuego**: `deleteCategoriaJuego(categoriaJuegoIds)` - Elimina relaciones específicas.

## Relación entre las operaciones y los casos de uso:

- **Registrar Usuario**: Utiliza `createUsuario` en el caso de uso de registro.
- **Realizar Compra**: Involucra `createCompra` y actualiza la relación con `createCategoriaJuego`.
- **Ver Juegos**: Utiliza `getAllJuegos` para listar los juegos disponibles.
- **Filtrar por Categoría**: Utiliza `getAllCategorias` y `getAllCategoriasJuegos` para mostrar juegos por categoría.
