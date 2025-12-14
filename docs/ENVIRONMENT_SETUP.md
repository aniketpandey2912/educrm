# 🌐 EduCRM Environment & Proxy Setup

Proxy configuration and environment management for all client apps.

---

## 📁 Structure

apps/
└── client/
└── config/
├── proxy.conf.json
└── environments/
├── student/
│ ├── environment.ts
│ └── environment.prod.ts
├── admin/
│ ├── environment.ts
│ └── environment.prod.ts
├── support-staff/
│ ├── environment.ts
│ └── environment.prod.ts
└── super-admin/
├── environment.ts
└── environment.prod.ts

---

## 🌍 Proxy Configuration

**Location:**
`apps/client/config/proxy.conf.json`

**Purpose:**
Routes frontend API calls to local backend server during development.

```json
{
  "/api/auth": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/api/student": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/api/admin": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/api/super": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/api/staff": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

Notes:

- Proxy is for dev only
- Production builds must point to real backend URLs
- Do NOT hardcode backend URLs

⚙️ Environment Aliases

- Configured in tsconfig.base.json
- This avoids:
  - relative imports
  - accidental cross-app environment usage

```
{
  "paths": {
    "@educrm/environment/student": [
      "apps/client/config/environments/student/environment.ts"
    ],
    "@educrm/environment/student.prod": [
      "apps/client/config/environments/student/environment.prod.ts"
    ],
    "@educrm/environment/admin": [
      "apps/client/config/environments/admin/environment.ts"
    ],
    "@educrm/environment/admin.prod": [
      "apps/client/config/environments/admin/environment.prod.ts"
    ],
    "@educrm/environment/staff": [
      "apps/client/config/environments/support-staff/environment.ts"
    ],
    "@educrm/environment/staff.prod": [
      "apps/client/config/environments/support-staff/environment.prod.ts"
    ],
    "@educrm/environment/super": [
      "apps/client/config/environments/super-admin/environment.ts"
    ],
    "@educrm/environment/super.prod": [
      "apps/client/config/environments/super-admin/environment.prod.ts"
    ]
  }
}
```

🧪 Usage Example

```ts
// In a student app service
import { environment } from '@educrm/environment/student';

console.log(environment.apiBaseUrl); // http://localhost:3000/api/student (dev)
```

Rules:

- Import only the environment for your app
- Never import another app’s environment
- Environment values must be read-only

🚫 What NOT to do

- ❌ Do not use process.env directly in frontend code
- ❌ Do not hardcode URLs in services or components
- ❌ Do not share environment files between apps
- ❌ Do not add business logic to environment files

🔐 Secrets & Sensitive Data

- .env files are not committed
- Use .env.example for reference only
- Frontend environment files must NOT contain secrets
- Backend secrets are managed separately (server-side only)

✅ Final Notes

- Environment configuration is per-app
- Proxy setup is dev-only
- Production configuration must be explicit and controlled
- This document should change only when configuration strategy changes

If your app runs locally and switches correctly between dev/prod,
this setup is working as intended ✅
