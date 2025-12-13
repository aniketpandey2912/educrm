# 🧠 EduCRM – Nx Monorepo

EduCRM is a multi-role education CRM platform built using Angular, Node.js, and Nx. This monorepo contains separate apps for students, admins, support staff, and super admins, with shared libraries for UI components, authentication, models, and utilities.

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

---

## 🚀 Tech Stack

- **Frontend**: Angular + PrimeNG
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Storage**: Firebase or Cloudinary (TBD)
- **Monorepo Tooling**: Nx

---

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/aniketpandey2912/educrm.git
cd educrm
```

```bash
npm install -g nx
```

💡 Requirements: Node.js v18+ and the Nx CLI (optional globally — you can also run via npx).

2. Install dependencies

```bash
npm install
```

3. Run a frontend app (example: student)

```bash
nx serve client-student
```

Replace `client-student` with `client-admin`, `client-support-staff`, or `client-super-admin` as needed.

4. Run the backend API

```bash
nx serve server
```

🏗️ Library Commands
Example commands used in the project:

```bash
# Angular app inside client
nx g @nx/angular:app --name=admin --directory=apps/client/admin --no-interactive

# Node.js backend app
nx g @nx/node:app --name=server --directory=apps/server --no-interactive

# Angular library (UI, Auth, etc.)
nx g @nx/angular:lib --name=ui --directory=libs/shared/ui --no-interactive

# Reusable component inside UI lib
nx g @nx/angular:component --name=button --project=shared-ui --export --flat

# Service or utility
nx g @nx/angular:service --name=auth --project=shared-auth
```

🧪 Formatting, Linting & Fixing

🔧 Auto-fix formatting and lint issues

```bash
npm run fix
```

This command:

- formats the repository with Prettier
- fixes lint issues for affected projects only

🔍 Lint a specific project

```bash
nx lint client-student
nx lint shared-ui
```

```bash
# Format codebase
nx format:write

# Run unit tests
nx test shared-ui
```

🚦 Git Workflow & Pre-push Rules

A pre-push hook is configured using Husky.

Before every git push, the following runs automatically:

```bash
nx affected -t lint test build
```

If any check fails → push is blocked

Fix the errors and push again

You do not need to run these manually.

📘 Coding Guidelines
All naming conventions, folder rules, and commit standards are documented in:

📄 CODING_GUIDELINES.md

💡 Useful Tips

```bash
# Visualize dependency graph

nx graph

# See affected projects

nx affected:apps
nx affected:libs

# Run tasks on affected projects

nx affected -t lint
nx affected -t build
```

✅ Final Rule

If ``git push` succeeds, the code is safe.
