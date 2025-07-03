// pago.js  (ES Module)
/* -------------------------------------------------
   Muestra el resumen de compra y vacía el carrito
   cuando el usuario envía el formulario de pago.
-------------------------------------------------- */
import { vaciarCarrito, updateCartCount } from './cart.js';

/* Pintar resumen a partir del localStorage ------------- */
function pintarResumen() {
    const cont = document.getElementById('resumen');
    if (!cont) return;

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        cont.innerHTML = '<p>🛒 El carrito está vacío.</p>';
        return;
    }

    let total = 0;
    cont.innerHTML = '';                 // limpiar por si recarga

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const p = document.createElement('p');
        p.textContent = `${item.nombre} x${item.cantidad} — $${subtotal}`;
        cont.appendChild(p);
    });

    /* Total en negrita */
    const pTotal = document.createElement('p');
    pTotal.style.fontWeight = 'bold';
    pTotal.textContent = `Total: $${total}`;
    cont.appendChild(pTotal);
}

/* ------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    /* 1. Mantener contador del carrito en el header */
    updateCartCount();

    /* 2. Mostrar resumen */
    pintarResumen();

    /* 3. Al enviar el formulario se vacía el carrito     *
     *    (no usamos preventDefault porque queremos que   *
     *    Formspree procese el envío y redireccione).     */
    const form = document.getElementById('form-pago');
    if (form) {
        form.addEventListener('submit', () => {
            vaciarCarrito();          // limpia localStorage
            updateCartCount();        // refresca el ícono justo antes de salir
        });
    }
});
