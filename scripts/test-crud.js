import 'dotenv/config';

const base = `http://localhost:${process.env.PORT || 3000}${process.env.API_PREFIX || '/api/v1'}/productos`;

const waitForServer = async (retries = 20, delay = 300) => {
  for (let i = 0; i < retries; i++) {
    try { const r = await fetch(base); if (r.ok) return true; } catch (e) {}
    await new Promise(r => setTimeout(r, delay));
  }
  throw new Error('Server not responding');
};

const run = async () => {
  try {
    await waitForServer();
    console.log('SERVER_READY');

    const toCreate = { nombre: 'TEST_CRUD_' + Date.now(), descripcion: 'Creado por prueba', precio: 9.99, cantidad: 3 };

    const post = await fetch(base, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(toCreate) });
    const postJson = await post.json();
    console.log('POST_OK', post.status, postJson.success ? postJson.data._id : postJson.message);

    const list = await fetch(base);
    const listJson = await list.json();
    console.log('LIST_COUNT', list.status, Array.isArray(listJson.data) ? listJson.data.length : 'ERR');

    const id = postJson.data._id;
    const getById = await fetch(`${base}/${id}`);
    console.log('GET_BY_ID', getById.status, (await getById.json()).success ? 'FOUND' : 'NOTFOUND');

    const update = await fetch(`${base}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ precio: 19.99, cantidad: 5 }) });
    console.log('UPDATE', update.status, (await update.json()).success ? 'OK' : 'ERR');

    const del = await fetch(`${base}/${id}`, { method: 'DELETE' });
    console.log('DELETE', del.status, (await del.json()).success ? 'OK' : 'ERR');

    const list2 = await fetch(base);
    console.log('LIST_AFTER_DELETE', list2.status, (await list2.json()).data.length);

    const html = await fetch(`http://localhost:${process.env.PORT || 3000}/public/index.html`);
    const txt = await html.text();
    console.log('FRONTEND_FETCH', html.status, txt.includes('<title>Examen') ? 'OK' : 'MISS');

    console.log('CRU D_TESTS_DONE');
  } catch (e) {
    console.error('TEST_ERROR', e.message);
    process.exit(1);
  }
};

run();
