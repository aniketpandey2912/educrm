# 📘 EduCRM Coding Guidelines

> Non-negotiable coding and architectural rules. Most are enforced automatically.

---

## 🧱 Nx Module Boundaries (VERY IMPORTANT)

Each Nx project must have:

- exactly **one `scope:*` tag**
- exactly **one `type:*` tag**

### Allowed Import Directions

| From ↓ / To → | shared | data-access | app |
| ------------- | ------ | ----------- | --- |
| app           | ✅     | ✅          | ❌  |
| shared        | ✅     | ❌          | ❌  |
| data-access   | ✅     | ✅          | ❌  |

### Rules

- Apps may import from `shared` and `data-access`
- Shared libraries must remain reusable
- Data-access must not depend on UI
- Apps must **never import other apps**

🚨 These rules are enforced via `@nx/enforce-module-boundaries`.

---

## 🅰️ Angular Selector Rules

- All **components** must use the `educrm-` prefix
- Component selectors must be **kebab-case**
- **Directives** must:
  - use attribute selectors
  - be **camelCase**
- ESLint enforces these rules automatically

### Examples

```html
<educrm-student-card></educrm-student-card>

@Directive({ selector: '[educrmHighlight]' })
```

Package Management

✅ Single package.json at repository root

✅ All frontend & backend dependencies live at root

❌ No per-app or per-lib package.json

🏗️ App & Library Generation Conventions
General Rules

- Always use --directory
- Always use --no-interactive
- Follow the existing folder conventions strictly

Create Angular Client App

```bash
nx g @nx/angular:app --name=admin --directory=apps/client/admin --no-interactive
```

Create Backend (Node.js) App

```bash
nx g @nx/node:app --name=server --directory=apps/server --no-interactive
```

Create Angular Library

```bash
nx g @nx/angular:lib --name=ui --directory=libs/shared/ui --no-interactive
nx g @nx/angular:lib --name=auth --directory=libs/shared/auth --no-interactive
```

Create Component in a Library

```bash
nx g @nx/angular:component card --project=shared-ui --export
```

- Generated selectors are auto-prefixed with educrm-.

Create Service in a Library

```bash
nx g @nx/angular:service auth --project=shared-auth
```

✨ Formatting, Linting & Fixing

```bash
npm run fix          # Format + lint + fix (affects only)
nx lint <project>    # Lint specific project
```

🚦 Git Workflow Rules

- Pre-push hook enforced via Husky
- Runs: `nx affected -t lint test build`

If any check fails:

- push is blocked
- fix locally
- push again

🚫 Do NOT bypass hooks.

📒 Naming Conventions

| Element            | Convention  | Example                        |
| ------------------ | ----------- | ------------------------------ |
| File names         | kebab-case  | `student-profile.component.ts` |
| Folder names       | kebab-case  | `student-dashboard/`           |
| Variables          | camelCase   | `studentId`                    |
| Classes / Types    | PascalCase  | `UserModel`, `LoginResponse`   |
| Exported constants | UPPER_SNAKE | `JWT_SECRET_KEY`               |

- Exported-only constants are enforced via ESLint.

📦 Import Rules

- Always import from a library’s public API
- Never import from src/lib/\* paths directly

✅ Correct:

```ts
import { Button } from '@educrm/shared-ui';
```

❌ Incorrect:

```ts
import { Button } from '@educrm/shared-ui/src/lib/button';
```

✅ Final Rule

If `git push` succeeds, code respects formatting, linting, and architectural boundaries.
