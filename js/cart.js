/* -------------------------------------------------
   cart.js  –  Módulo ES • manejo integral del carrito
-------------------------------------------------- */

/* 1. Estado ‑–––––––––––––––––––––––––––––––––––––– */
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

/* Util interno – persistir en localStorage */
const guardar = () => localStorage.setItem('carrito', JSON.stringify(carrito));

/* -------------------------------------------------
   2. Funciones exportadas (las usa el resto del sitio)
-------------------------------------------------- */
export function updateCartCount() {
    const span = document.getElementById('cart-count');
    if (span) span.textContent = carrito.reduce((s, i) => s + i.cantidad, 0);
}

export function mostrarPreview() {
    const c = document.getElementById('cart-container');          // sólo existe en index
    if (!c) return;
    c.innerHTML = carrito.length
        ? carrito.map(p => `<p>${p.nombre} ×${p.cantidad}</p>`).join('')
        : '<p>(Vacío)</p>';
}

/* Se invoca desde renderProducts.js → agregarAlCarrito(prod) */
export function agregarAlCarrito(producto) {
    const existe = carrito.find(i => i.id === producto.id);
    existe ? existe.cantidad++ : carrito.push({ ...producto, cantidad: 1 });

    guardar();
    updateCartCount();
    mostrarPreview();
}

/* -------------------------------------------------
   3. Funciones sólo para carrito.html
-------------------------------------------------- */
function eliminarPorIndice(idx) {
    carrito.splice(idx, 1);
    guardar();
    pintarCarrito();
}

/* 🔄 Exporto para pago.html – se usa en pago.js */
export function vaciarCarrito() {
    carrito = [];
    guardar();
    pintarCarrito();      // si estamos en carrito.html
    updateCartCount();
}

/* Render completo para carrito.html */
function pintarCarrito() {
    const cont = document.getElementById('carrito-contenedor');
    const totalDiv = document.getElementById('carrito-total');
    if (!cont || !totalDiv) return;          // no estamos en carrito.html

    cont.innerHTML = '';
    if (!carrito.length) {
        cont.innerHTML = '<p>🛒 Tu carrito está vacío.</p>';
        totalDiv.textContent = '';
        updateCartCount();
        return;
    }

    let total = 0;
    carrito.forEach((item, idx) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const card = document.createElement('div');
        card.className = 'card-cart';
        card.innerHTML = `
          <h3>${item.nombre}</h3>
          <p>$${item.precio} × ${item.cantidad}</p>
          <p>Subtotal: $${subtotal}</p>
          <button class="btn-eliminar" data-idx="${idx}">Eliminar</button>
        `;
        cont.appendChild(card);
    });

    totalDiv.textContent = `Total: $${total}`;

    /* Listeners de “Eliminar” */
    cont.querySelectorAll('.btn-eliminar')
        .forEach(btn =>
            btn.addEventListener('click',
                e => eliminarPorIndice(+e.currentTarget.dataset.idx)));

    updateCartCount();
}

/* Redirección a pago.html  */
function finalizarCompra() {
    if (!carrito.length) {
        alert('⚠️ Carrito vacío');
        return;
    }

    /* (Opcional) guardar resumen para mostrarlo en pago.html */
    sessionStorage.setItem('resumenCompra', JSON.stringify(carrito));

    window.location.href = 'pago.html';
}

/* -------------------------------------------------
   4. Inicialización automática en cada página
-------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();   // siempre
    mostrarPreview();    // index.html
    pintarCarrito();     // carrito.html

    /* 🔔 Si venimos de Formspree con ?success=1 mostrar aviso */
    const params = new URLSearchParams(location.search);
    if (params.get('success') === '1') {
        const aviso = document.getElementById('mensaje-compra');
        if (aviso) aviso.classList.remove('oculto');
    }

    /* Botones presentes sólo en carrito.html */
    const btnVaciar = document.getElementById('btn-vaciar');
    const btnFin = document.getElementById('btn-finalizar');
    if (btnVaciar) btnVaciar.addEventListener('click', vaciarCarrito);
    if (btnFin) btnFin.addEventListener('click', finalizarCompra);
});

/* -------------------------------------------------
   Fin del módulo cart.js
-------------------------------------------------- */
//             throw new Error('Error al enviar');
//         }