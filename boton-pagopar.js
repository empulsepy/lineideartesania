<div style="padding: 0 16px 24px; max-width: 600px; margin: 0 auto;">

  <button
    id="pp-btn"
    style="
      display:block; width:100%; padding:14px 24px;
      background-color:#0070f3; color:#fff;
      font-size:16px; font-weight:500;
      border:none; border-radius:6px; cursor:pointer;
    "
  >Pagar con PagoPar</button>

  <p id="pp-estado" style="margin-top:10px; font-size:14px; color:#444; text-align:center;"></p>

</div>

<script>
(function() {

  // Usamos el documento PADRE (la página real, no el iframe)
  var doc = window.parent.document;

  var intentos = 0;

  function capturar() {
    intentos++;

    var titulo   = doc.querySelector('h1.block-product__title');
    var precioEl = doc.querySelector('span.block-product__price');

    if ((!titulo || !precioEl) && intentos < 30) {
      setTimeout(capturar, 100);
      return;
    }

    if (!titulo || !precioEl) {
      console.warn('PagoPar: producto no encontrado en página padre');
      return;
    }

    var nombre = titulo.innerText.trim();
    var precio = parseInt(precioEl.innerText.replace(/\D/g, ''));

    console.log('PagoPar capturó del padre:', nombre, precio);

    // El botón y estado SÍ están en este documento (iframe)
    var btn    = document.getElementById('pp-btn');
    var estado = document.getElementById('pp-estado');

    if (!btn) return;

    btn.addEventListener('click', function() {
      var cantEl   = doc.querySelector('input.quantity-picker__amount');
      var cantidad = parseInt(cantEl ? cantEl.value : '1') || 1;
      var varEl    = doc.querySelector('.option-select__select');
      var variante = varEl ? varEl.options[varEl.selectedIndex].text : '';
      var total    = precio * cantidad;

      var datos = { nombre: nombre, precio: precio, cantidad: cantidad, variante: variante, total: total };
      console.log('Datos:', datos);

      estado.innerHTML =
        '<strong>✓ Datos leídos:</strong><br>' +
        'Producto: ' + nombre + (variante ? ' (' + variante + ')' : '') + '<br>' +
        'Precio: ₲' + precio.toLocaleString() + '<br>' +
        'Cantidad: ' + cantidad + '<br>' +
        '<strong>Total: ₲' + total.toLocaleString() + '</strong>';
    });
  }

  setTimeout(capturar, 500);

})();
</script>
