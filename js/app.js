/*  app.js  –  Carga catálogo y lo envía a renderProducts.js  */
import { mostrarProductos } from './renderProducts.js';   // ⇠ NUEVO import

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. Traer los 10 productos desde productos.json
        const res = await fetch('./productos.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const productos = await res.json();

        // 2. (Opcional) Exponerlos en consola para depurar
        window.Productos = productos;

        // 3. Dibujar las tarjetas en el grid
        mostrarProductos(productos);        // ← función que ya genera cada card
    } catch (err) {
        console.error('Error al cargar productos:', err);

        // Mensaje amistoso en pantalla si falla el fetch
        const grid = document.getElementById('products');
        if (grid) grid.textContent = 'No se pudieron cargar los productos 🙁';
    }
});
