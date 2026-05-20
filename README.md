# WorkoutFoods Storefront

WorkoutFoods is a Shopify Hydrogen storefront built with Remix and deployed to Shopify Oxygen.

## Tech Stack

- Shopify Hydrogen (`@shopify/hydrogen`)
- Remix (`@remix-run/react`, `@shopify/remix-oxygen`)
- React + TypeScript
- Tailwind CSS

## Prerequisites

- Node.js 18 or newer
- npm
- A Shopify store with Storefront API access
- Shopify CLI access for Hydrogen development/deployment

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root and set required variables:

```env
SESSION_SECRET=replace-with-a-long-random-secret
PUBLIC_STOREFRONT_API_TOKEN=your-storefront-api-token
PRIVATE_STOREFRONT_API_TOKEN=your-private-storefront-token
PUBLIC_STORE_DOMAIN=your-store.myshopify.com
PUBLIC_STOREFRONT_ID=your-storefront-id
HYDROGEN_ASSET_BASE_URL=/
```

3. Start local development:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Starts Hydrogen in development mode with codegen.
- `npm run build` - Builds the storefront for production with codegen.
- `npm run preview` - Previews the production build locally.
- `npm run lint` - Runs ESLint.
- `npm run codegen` - Generates GraphQL types/artifacts.
- `npm run format` - Formats files with Prettier.

## Build and Preview

```bash
npm run build
npm run preview
```

## Deployment

This repository includes a GitHub Actions workflow that deploys to Shopify Oxygen on push.

- Workflow file: `.github/workflows/oxygen-deployment-1000028067.yml`
- Deployment command used in CI: `npx shopify hydrogen deploy`
- Required GitHub secret: `OXYGEN_DEPLOYMENT_TOKEN_1000028067`

For manual deployment, you can run:

```bash
npx shopify hydrogen deploy
```

## Project Structure

- `app/` - Remix routes, components, and storefront UI.
- `server.ts` - Hydrogen/Oxygen request handler and cart/session setup.
- `public/` - Static assets.
- `remix.config.cjs` - Remix build/runtime configuration.

