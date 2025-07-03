// renderProducts.js
import { agregarAlCarrito } from './cart.js';

export function mostrarProductos(lista) {
    const contenedor = document.getElementById('products');
    contenedor.innerHTML = '';

    lista.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>Precio: $${prod.precio}</p>
      <button>Agregar</button>
    `;

        card.querySelector('button').addEventListener('click', () => {
            agregarAlCarrito(prod);
        });

        contenedor.appendChild(card);
    });
}
