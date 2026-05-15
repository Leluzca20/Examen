const apiBase = '/api/v1/productos';

const $ = (sel) => document.querySelector(sel);

const fetchJSON = async (url, opts) => {
    const res = await fetch(url, opts);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
};

const formatPrice = (value) => {
        const num = Number(value);
        if (!Number.isFinite(num)) return '0.00';
        return num.toFixed(2);
};

const setStatus = (text, type = 'secondary') => {
        const el = $('#status');
        el.textContent = `Estado: ${text}`;
        el.className = `badge text-bg-${type}`;
};

const setFormMessage = (text = '', type = 'warning') => {
        const box = $('#form-message');
        if (!text) {
                box.classList.add('d-none');
                box.textContent = '';
                return;
        }
        box.className = `alert alert-${type} mt-3`;
        box.textContent = text;
};

const renderList = (items) => {
        const tbody = $('#productos');
        const empty = $('#empty');
        const total = $('#total');
        tbody.innerHTML = '';

        const list = Array.isArray(items) ? items : [];
        total.textContent = list.length;

        if (list.length === 0) {
                empty.classList.remove('d-none');
                return;
        }

        empty.classList.add('d-none');

        list.forEach((p) => {
                const row = document.createElement('tr');
                const precio = formatPrice(p.precio ?? 0);
                const cantidad = p.cantidad ?? 0;
                const descripcion = p.descripcion ? p.descripcion : 'Sin descripción';
                row.innerHTML = `
                    <td>${p.nombre}</td>
                    <td class="text-muted">${descripcion}</td>
                    <td>$${precio}</td>
                    <td>${cantidad}</td>
                    <td class="text-end">
                        <button data-id="${p._id}" class="btn btn-sm btn-outline-primary edit">Editar</button>
                        <button data-id="${p._id}" class="btn btn-sm btn-outline-danger delete">Eliminar</button>
                    </td>`;
                tbody.appendChild(row);
        });
};

const load = async () => {
    try {
        setStatus('cargando', 'secondary');
        const res = await fetchJSON(apiBase);
        renderList(res.data);
        setStatus('conectado', 'success');
    } catch (e) {
        setStatus('sin conexión', 'danger');
        setFormMessage('No se pudo cargar la lista. Verifica que el servidor esté activo.', 'danger');
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
            setFormMessage('', 'warning');
            clearForm();
            load();
        } catch (e) {
            setFormMessage('Error guardando el producto. Revisa los datos.', 'warning');
        }
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
            window.scrollTo(0, 0);
        } else if (ev.target.classList.contains('delete')) {
            if (!confirm('Eliminar producto?')) return;
            await fetchJSON(`${apiBase}/${id}`, { method: 'DELETE' });
            load();
        }
    });

    $('#cancel').addEventListener('click', (e) => { e.preventDefault(); clearForm(); setFormMessage(''); });
    $('#refresh').addEventListener('click', () => load());
});
