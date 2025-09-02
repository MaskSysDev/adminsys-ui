# DocSys Started

This project is a minimalist starter template for building modern applications using [Next.js 15](https://nextjs.org/), [React 19](https://react.dev/), and [Tailwind CSS 4](https://tailwindcss.com/). It comes pre-configured with best practices, TypeScript, automatic formatting, and linting.

## ✨ Features

- Optimized structure with Next.js 15 (App Router)
- Full TypeScript support
- Styling with Tailwind CSS 4 and Shadcn/ui
- Optimized fonts using `next/font` (Geist and Geist Mono)
- Light/Dark theme system
- Reusable and modular components
- Responsive layout with mobile navigation
- Linting with Biome
- Git hooks with Husky for pre-commit validation
- Conventional commit messages enforced with commitlint

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18 or higher
- pnpm (recommended), npm, or yarn

### Installation

Install the dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
```

Start the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📁 Project Structure

- `src/app`: Contains all the routes, layouts, and pages of the application. The structure of the subdirectories defines the URL paths.
- `src/components`: Holds all reusable components used throughout the application, organized into `layout`, `ui` (from Shadcn), and `dev` (for development purposes).
- `src/config`: Centralizes application configuration, including site metadata, environment variables, and validation schemas.
- `src/hooks`: Stores custom React hooks to encapsulate and reuse stateful logic.
- `src/lib`: Includes utility functions, helper scripts, and font definitions.
- `src/styles`: Contains global style files, primarily `globals.css` for Tailwind CSS base styles.
- `public`: Stores static assets like images, icons, and fonts that are served directly by the browser.

## 🛠️ Useful Scripts

- `dev`: Starts the development server
- `build`: Builds the application for production
- `start`: Starts the production server
- `preview`: Builds and starts the application (production preview)
- `clean`: Removes node_modules and .next folders
- `lint`: Runs the linter
- `format`: Formats code
- `check`: Checks if code is properly formatted without making changes
- `typecheck`: Runs TypeScript to check for type errors
- `ui:add`: Adds new Shadcn UI components to the project.

## ☁️ Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/), but you can use any Node.js-compatible service.

## 📝 License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.
