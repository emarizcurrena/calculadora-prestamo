// Esta funcion devuelve true si el valorIngresado es igual o menor al maximo permitido
function validacionValores(maximo, valorIngresado) {
    if (valorIngresado > maximo) {
        return false;
    } else {
        return true;
    }
}

const tiposDePrestamo = [
    { id: 1, tipo: "casa", porcentaje: 7, maximo: 100000, maxCuotas: 60 },
    { id: 2, tipo: "auto", porcentaje: 12, maximo: 10000, maxCuotas: 24 },
    { id: 3, tipo: "negocio", porcentaje: 8, maximo: 30000, maxCuotas: 36 },
    { id: 4, tipo: "moto", porcentaje: 5, maximo: 2000, maxCuotas: 12 },
]

function prestamo(elements) {
    const monto = elements.monto.value;
    const cuotas = elements.cuotas.value;

    let tipoPrestamo = document.getElementById("tipoPrestamo").value;
    let prestamo = tiposDePrestamo.find(prestamo => prestamo.tipo === tipoPrestamo);

    document.getElementById('tipoDePrestamo').innerHTML = `Realizamos prestamos de hasta $${prestamo.maximo} y en hasta ${prestamo.maxCuotas} cuotas!`;

    if (validacionValores(prestamo.maximo, monto) && validacionValores(prestamo.maximo, cuotas)) {
        const cuotaMensual = (monto * ((prestamo.porcentaje / 100) + 1)) / cuotas;
        document.getElementById('cuota').innerHTML = `<p>Su cuota mensual es de: ${Math.round(cuotaMensual)}</p><p>A una tasa de interes del ${prestamo.porcentaje}%`;
    } else {
        document.getElementById('cuota').innerHTML = `Los valores que ingresó no son correctos`;
    }
}

const formulario = document.getElementById("formulario");
formulario.onsubmit = (e) => {
    e.preventDefault();
    prestamo(formulario.elements);
}

const formUsuario = document.getElementById("usuario");
formUsuario.onsubmit = (e) => {
    e.preventDefault();
    const nombre = formUsuario.elements.nombre.value;
    const email = formUsuario.elements.email.value;
    console.log(nombre, email);
    const datosJson = JSON.stringify({ nombre, email });
    localStorage.setItem("usuario", datosJson);
    // alert(`gracias ${nombre}, nos estaremos comunicando en la brevedad`);
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `gracias ${nombre}, nos estaremos comunicando en la brevedad`,
        showConfirmButton: false,
        timer: 2500
    })
}

const datosBanco = async () => {
    await fetch('https://emarizcurrena.github.io/Pasteleria-Marizcurrena/data.json').then(response => {
        return response.json();
    }).then(data => {
        document.getElementById("datosBanco").innerHTML = `${data.banco.nombre} - ${data.banco.direccion}`;
    }).catch(err => {
        // Do something for an error here
    });
}
datosBanco();


