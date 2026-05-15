const apiBase = '/api/v1/productos';

const $ = (sel) => document.querySelector(sel);

const fetchJSON = async (url, opts) => {
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

const renderList = (items) => {
  const container = $('#productos');
  container.innerHTML = '';
  items.forEach((p) => {
    const el = document.createElement('div');
    el.className = 'producto';
    el.innerHTML = `<div><strong>${p.nombre}</strong><div>${p.descripcion || ''}</div></div>
      <div class="actions">
        <button data-id="${p._id}" class="edit">Editar</button>
        <button data-id="${p._id}" class="delete">Eliminar</button>
      </div>`;
    container.appendChild(el);
  });
};

const load = async () => {
  try {
    const res = await fetchJSON(apiBase);
    renderList(res.data);
  } catch (e) {
    alert('Error cargando productos: ' + e.message);
  }
};

const clearForm = () => {
  $('#producto-id').value = '';
  $('#nombre').value = '';
  $('#descripcion').value = '';
  $('#precio').value = '';
  $('#cantidad').value = '';
};

document.addEventListener('DOMContentLoaded', () => {
  load();

  $('#producto-form').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const id = $('#producto-id').value;
    const body = {
      nombre: $('#nombre').value,
      descripcion: $('#descripcion').value,
      precio: Number($('#precio').value),
      cantidad: Number($('#cantidad').value),
    };

    try {
      if (id) {
        await fetchJSON(`${apiBase}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      } else {
        await fetchJSON(apiBase, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      }
      clearForm();
      load();
    } catch (e) { alert('Error guardando: ' + e.message); }
  });

  $('#productos').addEventListener('click', async (ev) => {
    const id = ev.target.getAttribute('data-id');
    if (!id) return;
    if (ev.target.classList.contains('edit')) {
      // fetch and populate
      const res = await fetchJSON(`${apiBase}/${id}`);
      const p = res.data;
      $('#producto-id').value = p._id;
      $('#nombre').value = p.nombre;
      $('#descripcion').value = p.descripcion || '';
      $('#precio').value = p.precio;
      $('#cantidad').value = p.cantidad;
      window.scrollTo(0,0);
    } else if (ev.target.classList.contains('delete')) {
      if (!confirm('Eliminar producto?')) return;
      await fetchJSON(`${apiBase}/${id}`, { method: 'DELETE' });
      load();
    }
  });

  $('#cancel').addEventListener('click', (e) => { e.preventDefault(); clearForm(); });
});
