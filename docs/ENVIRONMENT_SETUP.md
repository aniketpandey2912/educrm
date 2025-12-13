# 🌐 EduCRM Client Config: Environment & Proxy Setup

This document outlines the **proxy configuration** and **environment management** setup for all client apps within the EduCRM monorepo.

---

## 📁 Folder Structure

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

⚙️ Environment Aliases
Configured in tsconfig.base.json:

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

```
// In a student app service
import { environment } from '@educrm/environment/student';

console.log(environment.apiBaseUrl); // Output: http://localhost:3000/api/student (dev)

```
