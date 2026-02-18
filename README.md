# Deutsche Glasfaser — Magnolia DX Core SPA Projects

Two React SPAs integrated with Magnolia DX Core 6.2.17 via the Visual SPA Editor. The compiled apps are deployed into their respective light modules and served directly by Magnolia.

## Projects

- **DG (Standard Template Kit)** — Main Deutsche Glasfaser SPA
- **Wholesale (Standard Template Kit Wholesale)** — Wholesale portal SPA

## Requirements

- Node.js 16+ and npm 8+
- Magnolia DX Core 6.2.17 with the respective light modules

## Install

### DG Project
```bash
cd magnolia-dx-core-6.2.17-spa-dg/react-spa/standard-template-kit
npm install
```

### Wholesale Project
```bash
cd magnolia-dx-core-6.2.17-spa-wholesale/react-spa/standard-template-kit-wholesale
npm install
```

## Local Development

```bash
npm start
```

App runs at `http://localhost:3000`. Requires a running Magnolia instance at the host configured in `.env` (`REACT_APP_MGNL_HOST`).

## Build and Deploy to Magnolia

```bash
npm run deploy:mgnl
```

This cleans the previous build, builds the app using `.env.mgnl`, and copies the output to `magnolia/light-modules/[module-name]/webresources/build/`.

## Environment Files

| File | Used for |
|---|---|
| `.env` | Local development — points to the live Magnolia host |
| `.env.mgnl` | Production build — `PUBLIC_URL` set for light module serving, `REACT_APP_MGNL_HOST` left empty for relative API calls |

## Deployment to Production

After building the project with `npm run deploy:mgnl`:

1. **Zip the light module folder:**
   - For DG: `magnolia-dx-core-6.2.17-spa-dg/magnolia/light-modules/standard-template-kit/`
   - For Wholesale: `magnolia-dx-core-6.2.17-spa-wholesale/magnolia/light-modules/standard-template-kit-wholesale/`

2. **Create ITO ticket** requesting:
   - Unzip the provided archive
   - Add contents to the Magnolia `light-modules` folder on the server
   - Restart Docker containers

3. **Verify** the changes are reflected after container restart
