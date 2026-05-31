# 🧠 EduCRM – Nx Monorepo

Multi-role education CRM: **Angular** + **Node.js** + **Nx**

Roles: Students | Admins | Support Staff | Super Admins

**Stack**: Angular + PrimeNG | Node.js + Express | MongoDB | Nx

---

## ⚡ Quick Start

```bash
git clone https://github.com/aniketpandey2912/educrm.git
cd educrm
npm install
```

If install fails due to peer dependency conflicts during ecosystem upgrades, retry with:

```bash
npm install --legacy-peer-deps
```

**Serve**: `npm run student` (or `admin`, `support`, `super`)

**Backend**: `nx serve server`

**Requirements**: Node.js v20+

---

## 📖 Documentation

- [CONTRIBUTOR_ONBOARDING.md](docs/CONTRIBUTOR_ONBOARDING.md) - Single starting point for new contributors
- [PULL_REQUEST_PROCESS.md](docs/PULL_REQUEST_PROCESS.md) - 2-step PR process (required ticket info + optional description)
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) – Structure & design decisions
- [CODING_GUIDELINES.md](docs/CODING_GUIDELINES.md) – Rules & conventions
- [ENVIRONMENT_SETUP.md](docs/ENVIRONMENT_SETUP.md) – Config & proxy setup

## ClickUp and PR Linking

- PR description must include both:
  - ClickUp ticket id (example: `CU-XXXXXXXX`)
  - ClickUp task URL (example: `https://app.clickup.com/t/XXXXXXXX`)
- PR title format is flexible.
- A CI workflow enforces this on every pull request.

---

## 🔧 Common Commands

```bash
npm run fix                    # Format + lint + fix
nx lint <project>             # Lint specific project
nx graph                       # View dependency graph
nx affected -t lint test      # Run on affected projects
```

**Pre-push**: Auto-runs `nx affected -t lint test build`. Fix locally and push again.

---

## ✅ Rule

If `git push` succeeds, code respects formatting, linting, and architectural boundaries.
