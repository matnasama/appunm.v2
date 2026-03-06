# Despliegue local rápido

Pasos para arrancar la app localmente usando Postgres en Docker.

1) Copiar la plantilla de entorno

```bash
cp .env.local.example .env.local
# o editar directamente .env.local y poner la connection string
```

2) (Opcional) arrancar Postgres con Docker Compose

```bash
docker compose up -d
# Esto crea un contenedor Postgres en el puerto 5432
```

3) Crear la base y aplicar el SQL de inicialización (si aplica)

```bash
# Ejecuta el script SQL en el contenedor Postgres
docker compose exec -T postgres psql -U postgres -d unm_admin_dev -f /workspace/scripts/setup-database.sql
# Si `setup-database.sql` no está dentro del contenedor, copia/ejecuta localmente:
psql "postgresql://postgres:postgres@localhost:5432/unm_admin_dev" -f scripts/setup-database.sql
```

4) Instalar dependencias y arrancar Next.js

```bash
pnpm install
pnpm dev
# o con npm:
# npm install
# npm run dev
```

Notas:
- `lib/db.ts` usa `process.env.DATABASE_URL` para inicializar `neon()`.
- Si ves el error `No database connection string was provided to neon()`, asegúrate de que `.env.local` contiene `DATABASE_URL` antes de arrancar.
- Los mensajes de "Invalid source map" son advertencias de Turbopack; si molestan puedes probar `NEXT_DISABLE_TURBOPACK=1` en `.env.local`.
