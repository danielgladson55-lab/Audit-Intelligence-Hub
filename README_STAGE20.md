# Stage 20 Installation

## Copy files

Copy every package file to its matching repository path. Stage 20 intentionally replaces `src/App.jsx`, `src/components/core/AppShell.jsx`, `vite.config.js` and `README.md`.

## Add routes

In `src/app/AppRoutes.jsx`, add:

```jsx
import AboutPlatform from "../pages/AboutPlatform";
import NotFound from "../pages/NotFound";
```

Inside AppShell add:

```jsx
<Route path="/about" element={<AboutPlatform />} />
<Route path="*" element={<NotFound />} />
```

The wildcard route must be last.

## Navigation

Add one unique About link:

```jsx
{
  group: "Platform",
  items: [
    { label: "About Version 1.0", path: "/about", icon: "i" },
  ],
},
```

## CSS

In `src/main.jsx`, add:

```jsx
import "./release.css";
```

## Verify repository name

The supplied `vite.config.js` uses:

```js
base: "/Audit-Intelligence-Hub/"
```

Change it if the GitHub repository name differs.

## Validate

```bash
npm ci
npm run build
npm run preview
```

## Deploy

1. Commit and push to main.
2. Open Settings > Pages.
3. Select GitHub Actions as the deployment source.
4. Monitor Actions.
5. Open the deployed URL.
