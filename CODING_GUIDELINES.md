# 📘 EduCRM Coding Guidelines

> These are the enforced coding and repo conventions currently followed in the EduCRM Nx monorepo.

---

## 📁 Project Structure

```
apps/
  client/
    student/
    admin/
    support-staff/
    super-admin/
  server/
libs/
  shared/
    ui/
    auth/
    models/
    utils/
  data-access/
    api-client/
```

- All frontend Angular apps live in `apps/client/<role>`.
- Backend (Express.js) lives in `apps/server/`.
- Shared logic is organized under `libs/` using clear directories.

---

## 📆 Package Management

- ✅ Single `package.json` in the root of the Nx workspace.
- ✅ All frontend and backend dependencies installed at the root.
- ❄ No per-app package.json files.

---

## 🏗️ Library & App Generation Conventions

- ✅ Use `--directory` instead of `--project-root`.
- ✅ Follow path like: `libs/shared/ui`, `libs/data-access/api-client`
- ✅ Use `--no-interactive` flag for Nx CLI to prevent prompts.

### ✅ Commands

#### Create Angular App under Client Folder

```bash
nx g @nx/angular:app --name=admin --directory=apps/client/admin --no-interactive
```

#### Create Node.js App for Backend

```bash
nx g @nx/node:app --name=server --directory=apps/server --no-interactive
```

#### Create Angular Library

```bash
nx g @nx/angular:lib --name=ui --directory=libs/shared/ui --no-interactive
nx g @nx/angular:lib --name=auth --directory=libs/shared/auth --no-interactive
```

#### Create Component in a Library

```bash
nx g @nx/angular:component --name=card --project=shared-ui --export --flat
```

#### Create Service in a Library

```bash
nx g @nx/angular:service --name=auth --project=shared-auth
```

#### Create Interface or Model

```bash
nx g @nx/angular:interface --name=user --project=shared-models
```

#### Create Utility Function

```bash
nx g @nx/angular:service --name=date-util --project=shared-utils
```

---

## 🎨 UI Stack

- ✅ **Angular + PrimeNG**
- ✅ `primeng` and `primeicons` installed
- ✅ CSS added to `angular.json` styles array

```json
"styles": [
  "node_modules/primeng/resources/themes/lara-light-blue/theme.css",
  "node_modules/primeng/resources/primeng.min.css",
  "node_modules/primeicons/primeicons.css",
  "apps/client/student/src/styles.css"
]
```

- UI components are placed in `libs/shared/ui`.

---

## 🔧 Backend Stack

- ✅ **Node.js + Express.js**
- ✅ App located in `apps/server/`
- ✅ Single entry file: `main.ts` or `server.ts`
- ✅ Uses `express`, `cors`, `dotenv`, `mongoose`, etc.

---

## ✅ Commit Message Convention

- ✅ Conventional Commits format

**Examples:**

```bash
feat(auth): add JWT token refresh endpoint
fix(ui): correct button alignment in support-staff app
docs(readme): update installation instructions
```

**Supported types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## 🧱 Component Development

- ✅ PrimeNG is the main UI library
- ✅ Reusable UI components live in `shared/ui`
- ❄ Bootstrap is optional, not required

---

## 📒 Naming Conventions

| Type           | Style       | Example                        |
| -------------- | ----------- | ------------------------------ |
| File names     | kebab-case  | `student-profile.component.ts` |
| Folder names   | kebab-case  | `student-dashboard/`           |
| Variables      | camelCase   | `studentId`                    |
| Classes/Models | PascalCase  | `LoginResponse`, `UserModel`   |
| Constants      | UPPER_SNAKE | `JWT_SECRET_KEY`               |

---

## 🔐 Auth Setup (Planned)

- JWT-based
- Role-based access guard (future)
- Shared logic to be kept in `libs/shared/auth`
