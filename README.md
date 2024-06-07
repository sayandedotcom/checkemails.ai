# checkemails.ai

This is an official starter Turborepo.

## About the project

## Getting Started

## Main domains

| Domain           | Tech                | Version |
| ---------------- | ------------------- | ------- |
| Repository Tool  | Turborepo           | 1.9     |
| Primary Language | TypeScript          | 4.5     |
| Front-End        | Next.js             | 14+     |
| Back-End         | Node.js             | 20.9.0  |
| API              | GraphQL with Apollo | -       |
| Authentication   | Next-Auth           | 4       |
| Styling          | Tailwind CSS        | 3.3     |
| Database ORM     | Prisma              | 4.15    |
| Primary Database | PostgreSQL          | 15.3    |
| Caching Database | Redis               | -       |

### Workspaces List

| Index No. | Workspace/Folder | Info.            | Name                 | Navigate     | Port |
| --------- | ---------------- | ---------------- | -------------------- | ------------ | ---- |
| apps /    |                  |                  |                      |              |      |
| 1         | api              | For API Server   | @refhiredcom/api     | yarn api     | 8000 |
| 2         | blogs            | For blogs        | @refhiredcom/blogs   | yarn blogs   | -    |
| 3         | desktop          | For desktop app  | @refhiredcom/desktop | yarn desktop | -    |
| 4         | docs             | For docs         | @refhiredcom/docs    | yarn docs    | -    |
| 5         | mobile           | For mobile app   | @refhiredcom/mobile  | yarn mobile  | -    |
| 6         | storybook        | For Storybook    | @referrer/storybook  | yarn story   | 6006 |
| 7         | swagger          | For desktop app  | @refhiredcom/desktop | yarn desktop | -    |
| 8         | web              | For main website | @referrer/web        | yarn web     | 3000 |

## Features

1. Job referrals to top companies
2. Manage referrals requests
3. Easy apply to jobs referrals
4. Desktop App
5. Mobile App

## Getting Started

To get a local copy up and running, please follow these simple steps.
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Here is what you need to be able to run Cal.com.

- Node.js (Version: >=18.x)
- Git
- Docker and Docker Compose
- Yarn _(recommended)_

## Development

### Setup

1. Clone the repo into a public GitHub repository (or fork <https://github.com/sayandedotcom/refhired.com/fork>). If you plan to distribute the code, keep the source code public to comply with [AGPLv3](https://github.com/sayandedotcom/refhired.com/blob/main/LICENSE).

   ```sh
   git clone https://github.com/sayandedotcom/refhired.com
   ```

2. Go to the project folder

   ```sh
   cd refhired.com
   ```

3. Install packages with yarn

   ```sh
   yarn
   ```

4. Set up your `.env` file

   - Duplicate `.env.example` to `.env`
   - Use `openssl rand -base64 32` to generate a key and add it under `NEXTAUTH_SECRET` in the `.env` file.

5. Quick start with `yarn dx`
   This will run the docker compose file in the root directory from the docker image build from @refhired.com/web on `http://localhost:3000/` and docker image build from @refhired.com/prisma (database) on `http://localhost:5432/` and adminar on `http://localhost:8080/`

> - **Requires Docker and Docker Compose to be installed**

```sh
yarn dx
```

6. Once your server has started, go to this url `http://localhost:3000/` and you will see the website running on a Development Server.

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `web`: another [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `ui`: a stub React component library with [Tailwind CSS](https://tailwindcss.com/) shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Building packages/ui

This example is set up to produce compiled styles for `ui` components into the `dist` directory. The component `.tsx` files are consumed by the Next.js apps directly using `transpilePackages` in `next.config.js`. This was chosen for several reasons:

- Make sharing one `tailwind.config.js` to apps and packages as easy as possible.
- Make package compilation simple by only depending on the Next.js Compiler and `tailwindcss`.
- Ensure Tailwind classes do not overwrite each other. The `ui` package uses a `ui-` prefix for it's classes.
- Maintain clear package export boundaries.

Another option is to consume `packages/ui` directly from source without building. If using this option, you will need to update the `tailwind.config.js` in your apps to be aware of your package locations, so it can find all usages of the `tailwindcss` class names for CSS compilation.

For example, in [tailwind.config.js](packages/tailwind-config/tailwind.config.js):

```js
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/ui/*.{js,ts,jsx,tsx}",
  ],
```

If you choose this strategy, you can remove the `tailwindcss` and `autoprefixer` dependencies from the `ui` package.

### Utilities

This Turborepo has some additional tools already setup for you:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
