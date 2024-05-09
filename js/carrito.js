document.addEventListener('DOMContentLoaded', function () {
    const listaCarrito = document.querySelector('#lista-carrito');
    const totalCarrito = document.querySelector('#total');
    const botonVaciarCarrito = document.querySelector('#vaciar-carrito');
    let total = 0;
    let carrito = [];

    // Función para cargar el carrito desde el almacenamiento local
    function cargarCarritoDesdeLocalStorage() {
        if (localStorage.getItem('carrito')) {
            carrito = JSON.parse(localStorage.getItem('carrito'));
            cargarCarrito();
        }
    }

    // Función para guardar el carrito en el almacenamiento local
    function guardarCarritoEnLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Función para agregar un producto al carrito
    function agregarAlCarrito(event) {
        const boton = event.target;
        const card = boton.closest('.card');
        const titulo = card.querySelector('.card-title').textContent;
        const precioTexto = card.querySelector('h4').textContent;
        const precio = parseFloat(precioTexto.replace('$', '').replace(',', '')); // Eliminar símbolo de dólar y coma
        const imagenSrc = card.querySelector('.card-img-top').getAttribute('src');

        const productoExistente = carrito.find(producto => producto.titulo === titulo);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ titulo, precio, imagenSrc, cantidad: 1 });
        }

        guardarCarritoEnLocalStorage();
        cargarCarrito();
        event.preventDefault();

        Toastify({
            text: "Agregaste el producto al carrito",
            duration: 1000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
    }

    // Función para cargar los productos en el carrito
    function cargarCarrito() {
        listaCarrito.innerHTML = '';

        carrito.forEach(producto => {
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
                <td class="precio">$${producto.precio.toFixed(0)}</td>
                <td class="subtotal">$${(producto.precio * producto.cantidad).toFixed(0)}</td>
                <td>
                    <button class="btn btn-success btn-sm aumentar-item">+</button>
                    <button class="btn btn-warning btn-sm disminuir-item">-</button>
                    <button class="btn btn-danger btn-sm eliminar-item">Eliminar</button>
                </td>
            `;

            const botonEliminar = filaCarrito.querySelector('.eliminar-item');
            botonEliminar.addEventListener('click', () => eliminarDelCarrito(producto));

            const botonAumentar = filaCarrito.querySelector('.aumentar-item');
            botonAumentar.addEventListener('click', () => aumentarCantidad(producto));

            const botonDisminuir = filaCarrito.querySelector('.disminuir-item');
            botonDisminuir.addEventListener('click', () => disminuirCantidad(producto));

            listaCarrito.appendChild(filaCarrito);
        });

        calcularTotal();
    }

    // Función para eliminar un producto del carrito
    function eliminarDelCarrito(producto) {
        const index = carrito.findIndex(item => item.titulo === producto.titulo);
        carrito.splice(index, 1);
        guardarCarritoEnLocalStorage();
        cargarCarrito();
    }

    // Función para aumentar la cantidad de un producto en el carrito
    function aumentarCantidad(producto) {
        const index = carrito.findIndex(item => item.titulo === producto.titulo);
        carrito[index].cantidad++;
        guardarCarritoEnLocalStorage();
        cargarCarrito();
    }

    // Función para disminuir la cantidad de un producto en el carrito
    function disminuirCantidad(producto) {
        const index = carrito.findIndex(item => item.titulo === producto.titulo);
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
            guardarCarritoEnLocalStorage();
            cargarCarrito();
        }
    }

    // Función para vaciar el carrito
    function vaciarCarrito() {
        carrito = [];
        localStorage.removeItem('carrito');
        cargarCarrito();
    }

    // Función para calcular el total del carrito
    function calcularTotal() {
        total = carrito.reduce((accumulator, producto) => accumulator + producto.precio * producto.cantidad, 0);
        totalCarrito.textContent = `Total: $${total.toFixed(0)}`;
    }

    cargarCarritoDesdeLocalStorage();

    // Event Listeners
    document.querySelectorAll('.botonAgregarAlCarrito').forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    botonVaciarCarrito.addEventListener('click', vaciarCarrito);
});
