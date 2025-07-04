/*  app.js – carga de catálogo desde DummyJSON y llamado a renderizador */
import { mostrarProductos } from './renderProducts.js';

document.addEventListener('DOMContentLoaded', async () => {
    const API_URL = 'https://dummyjson.com/products?limit=10';  // 10 ítems

    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        /* La API devuelve { products: [ ... ] } */
        const data = await res.json();

        /* ✂️ Adaptamos los campos para que coincidan con los que usa el carrito */
        const productos = data.products.map(p => ({
            id: p.id,
            nombre: p.title,          // tu card usa → nombre
            precio: p.price,          // tu card usa → precio
            imagen: p.thumbnail       // tu card usa → imagen
        }));

        /* Opcional: exponer en consola para depurar */
        window.Productos = productos;

        /* Mostrar en el grid */
        mostrarProductos(productos);
    } catch (err) {
        console.error('Error al cargar productos:', err);
        const grid = document.getElementById('products');
        if (grid) grid.textContent = 'No se pudieron cargar los productos 🙁';
    }
});