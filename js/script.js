// comenzamos 

function bienvenida() {
    alert("Bienvenido a Vissio Marroquineria")
}

let nombre = prompt("Ingrese Su Nombre")
while (nombre === "") {
    alert("Ingrese su nombre para continuar")
    nombre = prompt("Ingrese Su Nombre")
}


{
    alert("Estamos encantados con tu visita " + nombre)
}

alert("¡Registrate y ganá un cupón de descuento!")

let opcion = prompt("Como quieres continuar: \n1- Registrarme y ganar un descuento \n2- Contactarme con un vendedor \n3- Consultar costos de envio \n4- Simular una Compra \n5 Ingresar a la Web")

while (opcion != "5") {
    switch (opcion) {
        case "1":
            let nombreRegistro = "";
            let passwordRegistro = "";
            while (nombreRegistro === "" || passwordRegistro === "") {
                nombreRegistro = prompt("Ingrese su nombre de usuario:");
                passwordRegistro = prompt("Ingrese su contraseña:");
                if (nombreRegistro === "" || passwordRegistro === "") {
                    alert("Debe completar todos los campos para registrarse.");
                }
            }
            alert("¡Felicitaciones! Te ganaste un 15% de descuento en toda tu compra!")
            break;
        case "2":
            alert("Podes mandar mail a asd@asd.com o contactarnos por WhatsApp al 12312312")
            break;
        case "3":
            alert("El costo de envio es de $5000")
            break;
        case "4":
            let carrito = [];
            let seguirAgregando = true;
            while (seguirAgregando) {
                let productoElegido = prompt("Ingrese el número del producto que desea agregar al carrito:\n1- Mochila ($20000)\n2- Bolso ($30000)\n3- Cartera ($15000)\n4- Riñonera ($10000):\n5- Envio a Domicilio ($5000)");
                switch (productoElegido) {
                    case "1":
                        carrito.push({ producto: "Mochila", precio: 20000 });
                        break;
                    case "2":
                        carrito.push({ producto: "Bolso", precio: 30000 });
                        break;
                    case "3":
                        carrito.push({ producto: "Cartera", precio: 15000 });
                        break;
                    case "4":
                        carrito.push({ producto: "Riñonera", precio: 10000 });
                        break;
                        case "5":
                        carrito.push({ producto: "Envio a Domicilio", precio: 5000 });
                        break;
                    default:
                        alert("Opción no válida.");
                        break;
                }
                seguirAgregando = confirm("¿Desea agregar otro producto?");
            }

            let totalCompra = 0;
            for (let item of carrito) {
                totalCompra += item.precio;
            }
            alert("El total de su compra es: $" + totalCompra.toFixed(2));
            break;
    }
    opcion = prompt("Como quieres continuar: \n1- Registrarme y ganar un descuento \n2- Contactarme con un vendedor \n3- Consultar costos de envio \n4- Simular una Compra \n5 Ingresar a la Web")
}
bienvenida()
