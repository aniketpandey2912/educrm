# 🏛️ EduCRM – Architecture Overview

This document explains the **high-level architectural decisions** behind the EduCRM Nx monorepo.

It focuses on **why** the project is structured the way it is — not on implementation details.

---

## 🎯 Architectural Goals

EduCRM is designed to be:

- Scalable across multiple roles (student, admin, staff, super-admin)
- Easy to maintain as the codebase grows
- Safe from accidental cross-dependencies
- Friendly to refactoring and long-term evolution

These goals are enforced through **Nx boundaries, ESLint rules, and clear layering**.

---

## 🧱 Monorepo Structure

EduCRM uses an **Nx monorepo** with two top-level concerns:

- apps/ → runnable applications
- libs/ → reusable libraries

### Apps

```
apps/
  client/
  student/
  admin/
  support-staff/
  super-admin/
server/
```

- Apps orchestrate features
- Apps do NOT contain reusable logic
- Apps may depend on shared and data-access libraries
- Apps must NEVER depend on other apps

---

### Libraries

```
libs/
  shared/
    ui/
    auth/
    models/
    utils/
    http-services/
    theme/ # configuration only
  data-access/
    api-client/
```

---

## 📦 Library Responsibilities

### `shared` (folder, NOT a project)

`libs/shared` is a **grouping folder**, not an Nx project.

> Folders are for organization.
> Nx projects define architectural boundaries.

---

### Shared Libraries

| Library         | Responsibility                                       |
| --------------- | ---------------------------------------------------- |
| `ui`            | Reusable Angular UI components                       |
| `auth`          | Authentication-related logic                         |
| `models`        | Shared interfaces, DTOs, contracts                   |
| `utils`         | Pure helper and utility functions                    |
| `http-services` | Runtime services (e.g. ThemeService, HTTP wrappers)  |
| `theme`         | Theme tokens & configuration only (no runtime logic) |

---

### Data Access

| Library      | Responsibility                  |
| ------------ | ------------------------------- |
| `api-client` | Communication with backend APIs |

- Contains API clients only
- Must not depend on UI
- May depend on shared models and utils

---

## 🧭 Dependency Rules (Enforced)

EduCRM follows **strict dependency direction rules**:

| From ↓ / To → | shared | data-access | app |
| ------------- | ------ | ----------- | --- |
| app           | ✅     | ✅          | ❌  |
| shared        | ✅     | ❌          | ❌  |
| data-access   | ✅     | ✅          | ❌  |

These rules are:

- defined using project tags
- enforced via `@nx/enforce-module-boundaries`

Violations fail linting automatically.

---

## 🅰️ UI Architecture

- Angular is used for all client apps
- PrimeNG is the primary UI library
- All reusable UI lives in `libs/shared/ui`
- All components use the `educrm-` selector prefix
- Theme configuration is separated from runtime logic

---

## 🎨 Theming Strategy

- Theme tokens & presets live in `libs/shared/theme`
- Theme runtime logic lives in `libs/shared/http-services`
- Theme switching is handled centrally
- UI components consume theme via services, not hardcoded values

This separation ensures:

- easy theme extension
- no tight coupling between UI and configuration

---

## 🔐 Backend Architecture

- Backend is a Node.js + Express application
- Lives under `apps/server`
- Exposes APIs consumed by `api-client`
- Backend models should align with `shared/models`

---

## 🧠 Key Design Principles

- Single responsibility per library
- No circular dependencies
- No shared “god” libraries
- Configuration ≠ runtime logic
- Boundaries are enforced, not assumed

---

## 🔮 Evolution Strategy

As the project grows, this architecture supports:

- additional client apps
- background workers
- feature-based libraries
- more themes
- stricter runtime separation (client vs server)

This document should evolve **only when architectural decisions change**.

---

## ✅ Final Note

If the Nx graph is clean and linting passes,
the architecture is being respected.
