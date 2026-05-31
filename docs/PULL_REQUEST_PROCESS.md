# Pull Request Process

This page explains how to create a valid pull request in this repository.

## 1. Before You Open a PR

1. Pick the ClickUp task.
2. Create your branch (branch naming is flexible).
3. Implement your changes.
4. Run local checks.

Recommended command:

```bash
nx affected -t lint test build
```

## 2. Open the PR

Use the PR template:

- [../.github/pull_request_template.md](../.github/pull_request_template.md)

Required PR title format:

- Must include ClickUp ticket ID, for example: `CU-XXXXXXXX: docs: improve onboarding`

Required PR body content:

- ClickUp ticket ID
- ClickUp task URL (for example: https://app.clickup.com/t/XXXXXXXX)

## 3. Validation Rules

PR validation is enforced by workflow:

- [../.github/workflows/pr-clickup-validation.yml](../.github/workflows/pr-clickup-validation.yml)

This workflow checks:

- PR title contains `CU-...`
- PR body contains `CU-...`
- PR body contains ClickUp URL

## 4. Review and Merge

1. Wait for required checks to pass.
2. Get required approval.
3. Resolve review comments.
4. Merge according to branch protection rules.

## 5. Quick Copy Templates

PR title example:

```text
CU-XXXXXXXX: docs: add contributor onboarding entry point
```

PR body ClickUp section example:

```markdown
## ClickUp Ticket

- Ticket ID: CU-XXXXXXXX
- Ticket URL: https://app.clickup.com/t/XXXXXXXX
```
