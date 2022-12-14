# Product Manager

Un administrador de productos que permite agregar, consultar,
actualizar y borrar una lista de productos, así como guardarlos
en un archivo en el sistema de archivos local.

***

## Primera preentrega del proyecto final (12/10/2022 - 12/10/17)

Se desarrollará un servidor que contenga los endpoints y servicios necesarios
para gestionar los productos y carritos de compra en el e-commerce.

### Se debe entregar {#se-debe-entregar}

Desarrollar el servidor basado en [Node.JS](https://nodejs.org/en/) y
[Express](https://expressjs.com/es/), que escuche en el puerto `8080` y
disponga de dos grupos de rutas: `/products` y `/carts`. Dichos endpoints
estarán implementados con el router de Express, con las siguientes
especificaciones:

1. Para el manejo de *productos*, el cual tendrá su router en `/api/products/`,
   configurar las siguientes rutas:
    - La ruta raíz `/`, mediante el método *GET*, deberá listar todos los
      *productos* de la base (incluyendo la limitación `?limit` del desafío
      anterior)
    - La ruta `/:pid`, mediante el método *GET*, deberá traer sólo el producto
      con el *id* proporcionado.
    - La ruta raíz `/`, mediante el método *POST*, deberá agregar un nuevo
      *producto* con los campos:
        - `id`: `number`/`string` (a tu elección). El *id* **NO** se manda
          desde el *body*. El *id* se autogenera como lo hemos visto desde los
          primeros entregables, asegurando que **NUNCA** se repetirán los *ids*
          en el archivo.
        - `title`: `string`,
        - `description`: `string`,
        - `code`: `string`,
        - `price`: `number`,
        - `status`: `boolean`, *verdadero* (`true`) por defecto,
        - `stock`: `number`,
        - `category`: `string`,
        - `thumbnails`: `Array` de `string` que contengan las rutas donde están
          almacenadas las imágenes referentes a dicho producto.
        > Todos los campos son obligatorios, a excepción de `thumbnails`.
    - La ruta `/:pid`, mediante el método *PUT*, deberá tomar un producto y
      actualizar o eliminar el *id* al momento de hacer dicha actualización.
    - La ruta `/:pid`, mediante el método *DELETE*, deberá eliminar el producto
      con el *pid* indicado.
2. Para el *carrito*, el cual tendrá su router en `/api/carts/`, configurar dos
   rutas:
    - La ruta raíz `/`, mediante el método *POST*, deberá crear un nuevo
      *carrito* con la siguiente estructura:
        - `id`: `number`/`string` (a tu elección). De igual manera, como con
          los *productos*, debes asegurar que nunca se dupliquen los *ids* y
          **que éste se genere automáticamente**.
        - `products`: `Array` que contendrá objetos que representen a cada
          *producto*
    - La ruta `/:cid`, mediante el método *GET*, deberá listar los productos
      que pertenezcan al carrito con el parámetro *cid* proporcionado.
    - La ruta `/:cid/product/:pid`, mediante el método *POST*, deberá agregar
      el *producto* al arreglo `products` del carrito seleccionado, agregándose
      como objeto bajo el siguiente formato:
        - `product`: **SÓLO DEBE CONTENER EL ID DEL PRODUCTO**. Es crucial que
          no agregues el producto completo.
        - `quantity`: debe contener el número de ejemplares de dicho
          *producto*. El *producto* de momento, se agregará de uno en uno.
3. Además, si un producto ya existente se intenta agregar al *arreglo de
   productos*, incrementar el campo `quantity` de dicho producto.
4. La persistencia de la información se implementará utilizando el *file
   system*, donde los archivos `productos.json` y `carrito.json` respaldan la
   información.
5. No es necesario realizar ninguna implementación visual. Todo el flujo se
   puede realizar por *Postman* o por el cliente de tu preferencia.

### Formato

Link al [repositorio de GitHub](https://github.com/sterroso/backend-product-manager/tree/PrimeraPreentregaProyectoFinal)
con el proyecto completo, sin la carpeta de `node_modules`.

### Sugerencias

- No olvides `app.use(express.json())`.
- No es necesario implementar multer.
- Link al vídeo donde se explica.


### Notas de desarrollador

1. Incluí la suite de pruebas, que se puede ejecutar mediante el comando
   `node --test`, mediante la cual se realizarán todas las pruebas para
   verificar que se cumpla con los requerimientos listados en [Se debe entregar](#se-debe-entregar).

***

## Tercer desafío entregable (12/3/2022 - 12/10/2022)

### Servidor con Express

#### Consigna

Desarrollar un servidor basado en [Express](https://expressjs.com/es/) donde podamos
hacer consultas a nuestro archivo de productos.

#### Aspectos a incluir

1. Se deberá incluir la clase `ProductManager` que actualmente utilizamos con
persistencia de archivos.
2. Desarrollar un **Servidor Express** que, en su archivo `app.js` importe el
archivo de `ProductManager` que actualmente tenemos.
3. El servidor debe contar con los siguientes *enpoints*:
    - Ruta `/products`, la cual debe leer el archivo de productos y devolverlos
    dentro de un objeto. Agregar el soporte para recibir por *query params* el valor
    "`?limit=`" el cual recibirá un límite de resultados.
    Si no se recibe *query* de *límite*, se devolverán todos los productos.
    Si se recibe un *límite*, sólo devolver el número de productos solicitados.
    - Ruta `/products/:pid` la cual debe recibir por `req.params` el `pid`
    (*product Id*), y devolver sólo el producto solicitado, en lugar de todos
    los productos.

#### Sugerencias

- Tu clase lee archivos con promesas. Recuerda usar `async`/`await` en tus *endpoints*.
- Utiliza un archivo que ya tenga productos, pues el desafío sólo es para gets.

#### Formato del entregable

[Liga al repositorio de GitHub](https://github.com/sterroso/backend-product-manager/tree/ServidorConExpress)
con el proyecto completo, el cual debe incluir:

- Carpeta `src` con el archivo `app.js` dentro y tu `ProductManager` dentro.
- Archivo `package.json` con la info del proyecto.
- **No incluir los `node_modules`** generados.

#### Proceso de testing de este entregable

1. Se instalarán las dependencias a partir del comando `npm install`.
2. Se echará a andar el servidor.
3. Se revisará que el archivo **YA CUENTE CON, AL MENOS, DIEZ PRODUCTOS
CREADOS** al momento de su entrega. Es importante para que los tutores no
tengan que crear los productos por sí mismos, y así agilizar el proceso de
tu evaluación.
4. Se corroborará que el servidor esté corriendo en el puerto `8080`.
5. Se mandará a llamar desde el *navegador* a la *url* `http://localhost:8080/products`
**sin query**, eso debe devolver todos los *productos*.
6. Se mandará a llamar desde el *navegador* a la *url* `http://localhost:8080/products?limit=5`,
eso debe devolver sólo los primeros 5 *productos*.
7. Se mandará a llamar desde el *navegador* a la *url* `http://localhost:8080/products/2`, eso
debe devolver **sólo el *producto* con el `id = 2`**.
8. Se mandará a llamar desde el *navegador* a la *url* `http://localhost:8080/products/34123123`,
al no existir un *producto* con el `id = 34123123`, debe devolver un objeto con un error indicando
que el *producto* no existe.

#### Notas del desarrollador (Sergio Terroso)

1. Se agregó el script `start`, en el archivo `package.json`, para iniciar el servidor
   desde la consola con el comando `npm start`.
2. Se agregó el archivo `initialInsert.js` que se encarga de verificar que exista un
   archivo `ProductManager.json` en la carpeta raíz con, por lo menos, 10 productos para
   realizar las pruebas.
3. Se agregó el script `prestart`, en el archivo `package.json`, para ejecutar el código
   del archivo `initialInsert.js` antes de arrancar el servidor Express.
4. Se agregó el script `dev`, en el archivo `package.json` para iniciar el servidor en
   modo depuración.
5. Se agregó el prefijo `api/` a las rutas indicadas en la consigna del desafío, de modo
   que, a partir de esta etapa del proyecto, la ruta para desplegar los productos es
   `http://localhost:8080/api/products` en vez de `http://localhost:8080/products`.

***

## Segundo desafío entregable (11/26/2022 - 12/3/2022)

### Manejo de archivos

#### Consigna

Realizar una *clase* de nombre `ProductManager`, el cual permitirá trabajar
con múltiples productos. Éste debe poder agregar, consultar, modificar y
eliminar un producto y manejarlo en persistencia de archivos (basado en
entregable 1).

#### Aspectos a incluir

1. La clase debe contar con una variable `this.path`, el cual se inicializará
desde el constructor y debe recibir la ruta a trabajar desde el momento
de generar su instancia.
2. Debe guardar objetos con el siguiente formato:
    - `id` (se debe incrementar automáticamente, no enviarse desde el cuerpo)
    - `title` (nombre del producto)
    - `description` (descripción del producto)
    - `price` (precio)
    - `thumbnail` (ruta de imagen)
    - `code` (código identificador)
    - `stock` (número de piezas disponibles)
3. Debe tener un método `addProduct` el cual debe recibir un *objeto* con el
formato previamente especificado, asignarle un `id` *autoincrementable* y
guardarlo en el *arreglo* (recuerda siempre guardarlo como un array en el archivo).
4. Debe tener un método `getProducts`, el cual debe leer el archivo de productos
y **devolver todos los productos** en *formato de arreglo*.
5. Debe tener un método `getProductById`, el cual debe recibir un `id`, y
tras leer el archivo, debe buscar el *producto* con el `id` especificado y
devolverlo en *formato objeto*.
6. Debe tener un método `updateProduct`, el cual debe recibir el `id` del
*producto* a actualizar, así también como el *campo* a actualizar (puede ser
el objeto completo, como en una *DB*), y debe actualizar el *producto* que
tenga ese `id` en el archivo. **NO DEBE BORRARSE SU ID**.
7. Debe tener un método `deleteProduct`, el cual debe recibir un `id` y debe
eliminar el *producto* que tenga ese `id` en el archivo.

#### Formato del entregable

Archivo de *JavaScript* con el nombre `ProductManager.js`.

Opcionalmente, [liga al repositorio de GitHub](https://github.com/sterroso/backend-product-manager/tree/LocalFilePersist) al que se subió el código.

#### Proceso de testing de este entregable

1. Se creará una instancia de la clase `ProductManager`.
2. Se llamará `getProducts` recién creada la instancia, debe devolver un *arreglo vacío* `[]`.
3. Se llamará al método `addProduct` con los campos:
    - `title`: "producto prueba"
    - `description`: "Este es un producto prueba"
    - `price`: 200
    - `thumbnail`: "Sin imagen"
    - `code`: "abc123"
    - `stock`: 25
    > El objeto debe agregarse satisfactoriamente con un `id` *generado automáticamente **SIN REPETIRSE***.
4. Se llamará el método `getProducts` nuevamente, esta vez debe aparecer el producto recién agregado.
5. Se llamará al método `getProductById` y se corroborará que devuelva el producto con el `id` especificado, en caso de no existir, debe arrojar un error.
6. Se llamará al método `updateProduct` y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el `id` y que sí se haya hecho la actualización.
7. Se llamará al método `deleteProduct`, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.

***

## Primer desafío entregable (11/19/2022 - 11/26/2022)

### Clases con ECMAScript y ECMAScript avanzado

#### Consigna

Realizar una *clase* `ProductManager` que gestione un conjunto de productos.

Te acercamos esta ayuda: [Hands on lab sobre creación de clases](https://www.google.com/url?q=https://docs.google.com/presentation/d/1x9kVx6k5RlVk4_ELHtL8epQWGKjN5H8Fwc2TaE8rHKQ/edit%23slide%3Did.g11af22068b0_8_697&sa=D&source=editors&ust=1669506607673402&usg=AOvVaw3gqH2owX0H9-y9IaDEWHYS) (Clase 1)

#### Aspectos a incluir

1. Debe crearse desde su *constructor* con el elemento `products`, el cual será un *arreglo vacío*.
2. Cada producto que gestione debe contar con las propiedades:
    - `title` (nombre del producto)
    - `description` (descripción del producto)
    - `price` (precio)
    - `thumbnail` (ruta de imagen)
    - `code` (código identificador)
    - `stock` (número de piezas disponibles)
3. Debe contar con un método `addProduct` el cual agregará un *producto* al arreglo de productos inicial.
    - Validar que no se repita el campo `code` y que todos los campos sean obligatorios.
    - Al agregarlo, debe crearse con un `id` automáticamente.
4. Debe contar con un método `getProducts` el cual debe devolver el arreglo con todos los productos creados hasta ese momento.
5. Debe contar con un método `getProductById` el cual debe buscar en el arreglo en producto que coincida con el `id`
    - En caso de no coincidir ningún `id`, mostrar en la consola un error *"Not found"*.

#### Formato del entregable

Archivo de *JavaScript*, listo para ejecutarse desde node.

Opcionalmente, [liga al repositorio de GitHub](https://github.com/sterroso/backend-product-manager) al que se subió el código.

#### Proceso de testing de este entregable

1. Se creará una instancia de la clase `ProductManager`.
2. Se llamará `getProducts` recién creada la instancia, debe devolver un *arreglo vacío* `[]`.
3. Se llamará al método `addProduct` con los campos:
    - `title`: "producto prueba"
    - `description`: "Este es un producto prueba"
    - `price`: 200
    - `thumbnail`: "Sin imagen"
    - `code`: "abc123"
    - `stock`: 25
    > El objeto debe agregarse satisfactoriamente con un `id` *generado automáticamente **SIN REPETIRSE***.
4. Se llamará al método `getProducts` nuevamente, esta vez debe aparecer el producto recién agregado.
5. Se llamará al método `addProduct` con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
6. Se evaluará que `getProductById` devuelva error si no encuentra el producto o el producto en caso de encontrarlo.

