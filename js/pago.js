/* pago.js — muestra resumen, envía a Formspree y da feedback visual */
import { vaciarCarrito, updateCartCount } from './cart.js';

/* -------- Función auxiliar: dibujar resumen del carrito ------------ */
function pintarResumen() {
    const cont = document.getElementById('resumen');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (!cont) return;

    if (!carrito.length) {
        cont.innerHTML = '<p>🛒 Tu carrito está vacío.</p>';
        return;
    }

    let total = 0;
    cont.innerHTML = '';

    carrito.forEach(p => {
        const sub = p.precio * p.cantidad;
        total += sub;
        cont.innerHTML += `<p>${p.nombre} ×${p.cantidad} — $${sub}</p>`;
    });

    cont.innerHTML += `<p style="font-weight:bold">Total: $${total}</p>`;
}

/* ------------------------- Lógica principal ------------------------ */
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    pintarResumen();

    const form = document.getElementById('form-pago');
    const aviso = document.getElementById('mensaje-enviado');
    if (!form) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();                        // no cambiamos de página

        try {
            const datos = new FormData(form);
            const res = await fetch(form.action, {
                method: 'POST',
                body: datos,
                headers: { 'Accept': 'application/json' }
            });

            if (!res.ok) throw new Error('Error al enviar');

            /* ✅ Éxito → feedback igual que en formulario.html */
            form.reset();                    // limpia los campos
            vaciarCarrito();                 // vacía storage + contador
            updateCartCount();
            aviso.classList.remove('oculto');
            aviso.classList.add('visible');  // se muestra el cartel verde
            pintarResumen();                 // ahora dirá “carrito vacío”

        } catch (err) {
            alert('Ups, no se pudo procesar el pago. Intentalo más tarde.');
            console.error(err);
        }
    });
});
