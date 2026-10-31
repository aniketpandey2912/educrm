# 📑 EduCRM – API Documentation (Swagger)

Backend: Node.js + Express. MongoDB via Mongoose, JWT-based auth (short-lived access token + DB-revocable refresh token), Zod request validation.

## Running the server

```bash
nx serve server
```

Requires a `.env` (see `.env.example`) with at least `MONGODB_URI`, `JWT_SECRET`, `JWT_REFRESH_SECRET`.

## Viewing the docs

Once the server is running, the API is documented at:

- **Swagger UI**: `http://localhost:3000/api/docs`
- **Raw OpenAPI JSON**: `http://localhost:3000/api/docs.json`

## How the docs are structured

The spec is split per API module so changing one module's docs never touches another's:

```
apps/server/src/docs/
  common.openapi.ts        # shared info, tags, security scheme, common schemas (ErrorResponse, DashboardResponse)
  modules/
    health.openapi.ts
    auth.openapi.ts        # paths + schemas for /api/auth/*
    student.openapi.ts     # paths for /api/student/*
    admin.openapi.ts       # paths for /api/admin/*
    support-staff.openapi.ts
    super-admin.openapi.ts
  generate-openapi.ts       # merges common + modules into openapi.ts
  openapi.ts                 # AUTO-GENERATED — served by main.ts, do not hand-edit
```

## Updating the docs

1. Edit the relevant file under `apps/server/src/docs/modules/` (or `common.openapi.ts` for shared schemas/tags).
2. Regenerate the merged spec:
   ```bash
   npm run docs:generate
   ```
3. Commit the regenerated `apps/server/src/docs/openapi.ts` along with your route/controller changes.

## Adding a new API module

1. Add a new routes file under `apps/server/src/routes/` as usual.
2. Create a matching `apps/server/src/docs/modules/<module>.openapi.ts` exporting `paths` (and `schemas` if the module needs its own).
3. Register it in `apps/server/src/docs/generate-openapi.ts` (one import + one entry in the `modules` array).
4. Run `npm run docs:generate`.
