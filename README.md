# Product Manager

Un administrador de productos que permite agregar, consultar,
actualizar y borrar una lista de productos, así como guardarlos
en un archivo en el sistema de archivos local.

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
