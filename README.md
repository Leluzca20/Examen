# Examen Parcial - Proyecto CRUD

Proyecto de ejemplo para el examen parcial.

## Requisitos rápidos
- Node.js >= 18
- MongoDB Atlas (colocar MONGO_URI en .env)

## Instalación

1. Instalar dependencias:

```
npm install
```

2. Copiar ejemplo de variables de entorno:

```
cp .env.example .env
```

3. Editar `.env` y colocar `MONGO_URI` con la cadena de conexión a MongoDB.

4. Ejecutar servidor en modo desarrollo:

```
npm run dev
```

## API (endpoints principales)

Base: `http://localhost:3000/api/v1/productos`

- `GET /` - Lista todos los productos
- `GET /:id` - Obtiene producto por id
- `POST /` - Crea producto
- `PUT /:id` - Actualiza producto
- `DELETE /:id` - Elimina producto

## Frontend

Abrir `public/index.html` y usar la interfaz para probar operaciones CRUD.

## Notas
- No subir `.env` al repositorio (contiene credenciales).
- El usuario de git debe ser `leluzca` en los commits de entrega.
