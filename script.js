// Carrito de compras
let carrito = [];
let totalGeneral = 0;

// Función para agregar productos al carrito
document.querySelectorAll('.agregar-carrito').forEach(button => {
    button.addEventListener('click', (e) => {
        const productoId = e.target.dataset.id;
        const precioProducto = parseFloat(e.target.dataset.precio);
        agregarAlCarrito(productoId, precioProducto);
    });
});

// Función para agregar producto al carrito
function agregarAlCarrito(productoId, precioProducto) {
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === productoId);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ id: productoId, precio: precioProducto, cantidad: 1 });
    }

    actualizarCarrito();
}

// Actualizar el carrito y mostrarlo en la tabla
function actualizarCarrito() {
    const tbody = document.querySelector('#tabla-carrito tbody');
    tbody.innerHTML = '';

    totalGeneral = 0;

    carrito.forEach((producto, index) => {
        const totalProducto = producto.precio * producto.cantidad;
        totalGeneral += totalProducto;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>Producto ${producto.id}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>${producto.cantidad}</td>
            <td>$${totalProducto.toFixed(2)}</td>
            <td><button class="eliminar-producto" data-index="${index}">Eliminar</button></td>
        `;
        tbody.appendChild(row);
    });

    document.querySelector('#total-general').textContent = `$${totalGeneral.toFixed(2)}`;

    // Añadir funcionalidad de eliminar
    document.querySelectorAll('.eliminar-producto').forEach(button => {
        button.addEventListener('click', (e) => {
            const productoIndex = e.target.dataset.index;
            eliminarProducto(productoIndex);
        });
    });
}

// Función para eliminar un producto del carrito
function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Función simulada para realizar el pago
document.querySelector('#form-pago').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Pago procesado exitosamente');
    carrito = [];
    actualizarCarrito();
});
// Escuchar el clic en el botón "Proceder al Pago"
document.getElementById('realizar-pago').addEventListener('click', function() {
    // Obtener el total a pagar desde el HTML (elemento con ID 'total-general')
    let total = document.getElementById('total-general').innerText.replace('$', '');

    // Número de Yape del destinatario
    const yapeNumber = '953396919; // Reemplazar con el número real de Yape

    // Generar los datos del QR con el monto y el número de Yape
    let qrData = `https://yape.example.com/payment?number=${yapeNumber}&amount=${total}`;

    // Limpiar el contenedor del QR para evitar duplicados
    let qrCodeContainer = document.getElementById('qrCode');
    qrCodeContainer.innerHTML = ""; // Limpiar el contenedor anterior

    // Generar el código QR
    new QRCode(qrCodeContainer, {
        text: qrData,   // Datos que contendrá el código QR
        width: 200,     // Ancho del QR
        height: 200     // Alto del QR
    });
});
new QRCode(qrCodeContainer, {
    text: qrData,   
    width: 150,     // Ancho ajustado del QR
    height: 150     // Alto ajustado del QR
});

// Selección de elementos
const modal = document.getElementById("modal");
const span = document.getElementsByClassName("close")[0];
//incluido recien
// Movimiento dinámico al azar
function moverCuadros() {
    const cuadros = document.querySelectorAll('.QRLOGO');
    
    cuadros.forEach(QRLOGO => {
        const randomX = Math.floor(Math.random() * 200) - 100; // Movimiento aleatorio en eje X
        const randomY = Math.floor(Math.random() * 200) - 100; // Movimiento aleatorio en eje Y
        
        cuadro.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
}

// Ejecuta el movimiento cada 2 segundos
setInterval(moverCuadros, 2000);

document.addEventListener("DOMContentLoaded", function() {
    // Selecciona el contenedor QR y el formulario de pago
    const qrContainer = document.getElementById("qrCode");
    const pagoForm = document.getElementById("pago-form");

    // Inserta el formulario de pago justo después del contenedor QR
    qrContainer.insertAdjacentElement("afterend", pagoForm);
});
