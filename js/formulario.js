// public/js/formulario.js
import { updateCartCount } from './cart.js';

document.addEventListener('DOMContentLoaded', () => {
   updateCartCount();

   const form = document.getElementById('form-contacto');
   const aviso = document.getElementById('mensaje-enviado');
   if (!form) return;

   form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const datos = new FormData(form);
      try {
         const res = await fetch(form.action, {
            method: 'POST',
            body: datos,
            headers: { 'Accept': 'application/json' }
         });
         if (!res.ok) throw new Error('Error al enviar');

         form.reset();                          // limpia campos
         aviso.classList.remove('oculto');      // quita display:none
         aviso.classList.add('visible');        // aplica display:block
      } catch (err) {
         alert('Ups, no se pudo enviar tu mensaje. Intentalo más tarde.');
         console.error(err);
      }
   });
});
