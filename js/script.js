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

let opcion = prompt("Como quieres continuar: \n1- Registrarme y ganar un descuento \n2- Contactarme con un vendedor \n3- Consultar costos de envio \n4- Ingresar y empezar a Comprar")

while (opcion != "4") {
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
    }
    opcion = prompt("Como quieres continuar: \n1- Registrarme y ganar un descuento \n2- Contactarme con un vendedor \n3- Consultar costos de envio \n4- Ingresar y empezar a Comprar")
}
bienvenida()
