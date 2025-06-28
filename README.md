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

💡 Make sure you have Node.js v18+ and Nx CLI globally installed:

2. Install Dependencies

```bash
npm install
```

3. Run Frontend App (Example: Student)

```bash
nx serve client-student
```

Replace client-student with client-admin, client-support-staff, or client-super-admin as needed.

4. Run Backend API

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

🧪 Lint, Format & Test

```bash
# Lint a specific project
nx lint client-student

# Format codebase
nx format:write

# Run unit tests
nx test shared-ui
```

📘 Coding Guidelines
All naming conventions, folder rules, and commit standards are documented in:

📄 CODING_GUIDELINES.md

💡 Useful Tips
Use `nx graph` to visualize project dependencies

Use `nx run-many` to build/test/lint multiple projects at once

Use `nx affected:apps` after a PR to see what changed

Use `nx build <project>` before deployment
