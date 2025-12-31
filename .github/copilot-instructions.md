<!-- Copilot instructions for citizen-management-fe front-end -->

# Project overview

This workspace contains a React + Vite front-end (citizen-management-fe) that talks to a REST API backend under `/api`.

- Front-end entry: src/main.jsx → `AuthProvider` + `App` routing ([src/main.jsx](fe_prj/citizen-management-fe/src/main.jsx)).
- Routes are declared in [src/App.jsx](fe_prj/citizen-management-fe/src/App.jsx).
- API client: [src/services/http.client.js](fe_prj/citizen-management-fe/src/services/http.client.js).
- Canonical API config and endpoint mapping: [src/services/api.config.js](fe_prj/citizen-management-fe/src/services/api.config.js).

# Big-picture architecture notes for coding agents

- Single-page React app built with Vite. UI components live under `src/components` and pages under `src/pages`.
- Services live in `src/services/*`. They use a central `httpClient` instance for all network requests.
- Auth is currently mocked in `src/context/AuthContext.jsx` (localStorage key `cm_user`). The HTTP client expects a bearer token in localStorage under the key `token`.
  - To wire real auth: update `AuthContext.login()` to call the backend auth endpoint, store the returned token and user object, and call `httpClient.setAuthToken(token)`.

# Developer workflows (concrete commands)

- Install deps and run dev server (from `fe_prj/citizen-management-fe`):

```
cd fe_prj/citizen-management-fe
npm install
npm run dev    # starts Vite HMR server
npm run build  # production build
npm run preview
npm run lint
```

- Configure backend URL: set `VITE_API_BASE_URL` in a `.env` file at the project root (Vite reads `.env*`). Default is `http://localhost:8080/api`.

# Conventions and patterns specific to this project

- HTTP: use the exported `httpClient` instance (src/services/http.client.js). Services typically call `httpClient.get/post/put/delete` with relative paths.
- API endpoints are defined in `API_ENDPOINTS` in `api.config.js` but not uniformly used—many services use literal paths. Prefer using `API_ENDPOINTS` when adding new services.
- Local storage keys:
  - `cm_user` — used by `AuthContext` for UI-level user data (mocked)
  - `token` — expected by `httpClient` for Authorization header
- Error handling: `httpClient.request()` throws Error objects with `.status` and `.data` when available. Services catch and rethrow; pages should catch and present user-friendly messages.
- Language: many route paths and API endpoints use Vietnamese identifiers (e.g. `/nhankhau`, `/ho-khau`, `/phivesingh`) — keep naming consistent when adding features.

# Integration points & external dependencies

- Backend: REST API at `VITE_API_BASE_URL` (see `api.config.js`). Endpoints are resource-oriented (residents, households, fees, donations, reports).
- Third-party libs: Vite (dev server), React 19, react-router-dom, Tailwind (postcss), recharts, jspdf/html2canvas for PDF/export features.

# Debugging notes for agents

- Use browser devtools with Vite HMR. Network errors surface as fetch rejections; inspect `httpClient` thrown Error (`status` & `data`).
- To reproduce auth flows locally, either:
  - Implement a small mock backend returning a token at `/api/auth/login`, or
  - Temporarily set `localStorage.setItem('token','<jwt>')` in console and `localStorage.setItem('cm_user', JSON.stringify(...))`.

# Examples (where to change code)

- To add a new API call: create `src/services/my.service.js` and call `httpClient.get('/resource')` (or use `API_ENDPOINTS` from api.config.js).
- To wire real login: update [src/context/AuthContext.jsx](fe_prj/citizen-management-fe/src/context/AuthContext.jsx) and call `httpClient.setAuthToken(token)` after successful login.
- To change base URL for integration testing: create `.env.local` with `VITE_API_BASE_URL=https://staging.example/api`.

# What I looked at while generating this file

- [src/main.jsx](fe_prj/citizen-management-fe/src/main.jsx)
- [src/App.jsx](fe_prj/citizen-management-fe/src/App.jsx)
- [src/context/AuthContext.jsx](fe_prj/citizen-management-fe/src/context/AuthContext.jsx)
- [src/services/http.client.js](fe_prj/citizen-management-fe/src/services/http.client.js)
- [src/services/api.config.js](fe_prj/citizen-management-fe/src/services/api.config.js)
- [package.json](fe_prj/citizen-management-fe/package.json)

# Questions for you / next steps

- Should I switch `AuthContext` from mock to real API calls and persist the token via `httpClient.setAuthToken()`? If yes, provide the auth endpoint shape or I can infer a common pattern.
- Want me to run `npm run lint` or start the dev server and capture startup logs?

Please review and tell me what to expand or change.
