# Contributor Onboarding

This is the single starting page for new contributors.

Read this page first, then follow the linked docs only when needed.

## 1. What You Are Working In

- Nx monorepo with multiple role-based apps and shared libraries.
- Main stack: Angular, Node.js/Express, MongoDB, Nx.

See architecture details:

- [ARCHITECTURE.md](ARCHITECTURE.md)

## 2. First-Time Setup

1. Clone the repository.
2. Install dependencies from the repo root.
3. Start the app you need and verify it runs.

Use setup and environment details here:

- [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md)

## 3. Daily Development Flow

1. Pick a ClickUp task.
2. Create a branch (branch name is flexible).
3. Implement the feature.
4. Run local checks.
5. Open a PR using the template.
6. Ensure PR title/body contains required ClickUp references.
7. Address review comments and merge.

## 4. Rules You Must Follow

- Respect Nx module boundaries and import direction.
- Follow naming conventions.
- Import from library public APIs only.
- Do not bypass lint/test/build checks.

Full coding rules:

- [CODING_GUIDELINES.md](CODING_GUIDELINES.md)

## 5. PR and ClickUp Linking Rules

Current repository policy:

- PR title must include ClickUp ticket ID (example: CU-86d33kn24).
- PR body must include:
  - ClickUp ticket ID
  - ClickUp task URL (example: https://app.clickup.com/t/86d33kn24)

These are enforced by CI workflow and PR template.

## 6. Where Enforcement Lives

- PR template:
  - [../.github/pull_request_template.md](../.github/pull_request_template.md)
- CI validation workflow:
  - [../.github/workflows/pr-clickup-validation.yml](../.github/workflows/pr-clickup-validation.yml)

## 7. Commands You Will Use Often

- npm run student
- npm run admin
- npm run support
- npm run super
- nx serve server
- nx affected -t lint test build

## 8. Quick Troubleshooting

- If push fails, run/fix lint, test, and build for affected projects.
- If imports fail, check module boundaries and public API usage.
- If app API calls fail locally, confirm proxy and environment configuration.

## 9. Suggested Reading Order for New Joiners

1. This file: [CONTRIBUTOR_ONBOARDING.md](CONTRIBUTOR_ONBOARDING.md)
2. Architecture: [ARCHITECTURE.md](ARCHITECTURE.md)
3. Setup: [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md)
4. Coding rules: [CODING_GUIDELINES.md](CODING_GUIDELINES.md)

If you can run app + server, pass checks, and open a valid PR, you are ready to contribute.
