🛍️ Avanti Shop – Proyecto final
Desarrollado por: Duarte Darío
Carrera: Programador Universitario – UNLP (cursando 1er año avanzado)
Sitio en línea: https://gitdarweb.github.io/-avanti-shop/


📌 Objetivo del proyecto

Este proyecto forma parte del trabajo final del curso de frontend. Consiste en una tienda online simple con carrito de compras, formularios funcionales y diseño adaptativo. El desarrollo se centró en aplicar todos los temas vistos en clase, incluyendo:


✅ Funcionalidades implementadas

Interactividad completa:	Catálogo dinámico, botón "Agregar", vista de carrito con edición y paso final a pago.

Persistencia de datos:	Uso de localStorage para mantener el carrito activo aunque se cierre o recargue la página.

Formulario funcional:	Dos formularios (formulario.html y pago.html) conectados a Formspree, que envían los datos sin recargar.

Diseño responsivo:	Grilla de productos adaptable a todos los tamaños de pantalla. Navegación y formularios fluidos.

Carga dinámica de productos:	Se incluye un `productos.json` como ejemplo local, y también una versión activa con consumo de la API [DummyJSON](https://dummyjson.com/products?limit=10) mediante `fetch()`. |

Código organizado en módulos:	Estructura clara: app.js, cart.js, formulario.js, pago.js, etc.

Buenas prácticas web:	Semántica HTML, accesibilidad básica (alt, roles) y estilos limpios centralizados en styles.css.


📁 public/
│
├── index.html
├── carrito.html
├── pago.html
├── formulario.html
├── productos.json ( usada como ejemplo alternativo )
│
├── css/
│   └── styles.css
│
└── js/
    ├── app.js
    ├── cart.js
    ├── pago.js
    ├── formulario.js
    └── renderProducts.js



---

## ✨ Comentario final

Este proyecto reúne todos los conocimientos adquiridos en el curso: manipulación del DOM, uso de `fetch()` para APIs, manejo de formularios, almacenamiento en `localStorage`, diseño responsivo y organización en módulos. Fue desarrollado de forma individual y representa un ejemplo completo de integración de herramientas modernas de frontend.

---


