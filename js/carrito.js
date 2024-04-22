document.addEventListener('DOMContentLoaded', function () {
    const listaCarrito = document.querySelector('#lista-carrito');
    const totalCarrito = document.querySelector('#total');
    const botonVaciarCarrito = document.querySelector('#vaciar-carrito');
    let total = 0;
    let carrito = [];

    // Verificar si hay productos en el localStorage al cargar la página
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        carrito.forEach(producto => {
            agregarProductoAlCarrito(producto);
        });
    }

    // Agregar evento clic a todos los botones de "Agregar al Carrito"
    document.querySelectorAll('.botonAgregarAlCarrito').forEach(boton => {
        boton.addEventListener('click', function(event) {
            const boton = event.target;
            const card = boton.closest('.card');
            const titulo = card.querySelector('.card-title').textContent;
            const precioTexto = card.querySelector('h4').textContent;
            const precio = parseFloat(precioTexto.replace('$', '').replace(',', '')); // Eliminar símbolo de dólar y coma
            const imagenSrc = card.querySelector('.card-img-top').getAttribute('src');
            
            // Verificar si el producto ya está en el carrito
            const productoExistente = carrito.find(producto => producto.titulo === titulo);
            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push({
                    titulo: titulo,
                    precio: precio,
                    cantidad: 1,
                    imagenSrc: imagenSrc
                });
            }

            // Actualizar el localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));

            // Actualizar el carrito en la página
            actualizarCarrito();
        });
    });

    // Agregar evento clic al botón de "Vaciar Carrito"
    botonVaciarCarrito.addEventListener('click', function() {
        carrito = [];
        localStorage.removeItem('carrito');
        actualizarCarrito();
    });

    // Función para agregar un producto al carrito
    function agregarProductoAlCarrito(producto) {
        const filaCarrito = document.createElement('tr');
        filaCarrito.classList.add('fila-producto');
        filaCarrito.innerHTML = `
            <td class="nombre-producto">
                <div class="d-flex align-items-center">
                    <img src="${producto.imagenSrc}" alt="${producto.titulo}" class="img-thumbnail mr-2" style="max-width: 50px;">
                    <span>${producto.titulo}</span>
                </div>
            </td>
            <td class="cantidad">${producto.cantidad}</td>
            <td class="precio">$${producto.precio.toFixed(2)}</td>
            <td class="subtotal">$${(producto.cantidad * producto.precio).toFixed(2)}</td>
            <td>
                <button class="btn btn-danger btn-sm eliminar-item">Eliminar</button>
            </td>
        `;

        // Agregar evento clic al botón de "Eliminar"
        const botonEliminar = filaCarrito.querySelector('.eliminar-item');
        botonEliminar.addEventListener('click', function() {
            const index = carrito.findIndex(p => p.titulo === producto.titulo);
            if (index !== -1) {
                carrito.splice(index, 1);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarCarrito();
            }
        });

        // Agregar fila del producto al carrito
        listaCarrito.appendChild(filaCarrito);
    }

    // Función para actualizar el carrito en la página
    function actualizarCarrito() {
        // Limpiar el carrito actual
        listaCarrito.innerHTML = '';
        total = 0;

        // Agregar los productos al carrito desde el localStorage
        carrito.forEach(producto => {
            agregarProductoAlCarrito(producto);
            total += producto.cantidad * producto.precio;
        });

        // Actualizar el total del carrito
        totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    }
});

