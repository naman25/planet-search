# React Webpack Typescript Starter

> Minimal starter template for react with hot module replacement (HMR) for rapid development.

Contains following in the setup.

- **[React](https://facebook.github.io/react/)** (16.x)
- **[React Router DOM](https://reactrouter.com/web/guides/quick-start)** (5.2.x)
- **[Webpack](https://webpack.js.org/)** (4.x)
- **[Typescript](https://www.typescriptlang.org/)** (3.x)
- **[Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/)** ([React Hot Loader](https://github.com/gaearon/react-hot-loader))
- Production build script (Webpack)
- Image loading/minification ([Image Webpack Loader](https://github.com/tcoopman/image-webpack-loader))
- [SASS](http://sass-lang.com/) support
- Code linting ([ESLint](https://github.com/eslint/eslint)) and formatting ([Prettier](https://github.com/prettier/prettier))
- Test framework ([Jest](https://facebook.github.io/jest/))

## Installation

1. Clone/download repo
2. `npm install`

## Usage

**Development**

`npm run start-dev`

- Build app continuously (HMR enabled)
- App served @ `http://localhost:8080`

**Production**

`npm run start-prod`

- Build app once (HMR disabled) to `/dist/`
- App served @ `http://localhost:3000`

---

**All commands**

| Command              | Description                                                                   |
| -------------------- | ----------------------------------------------------------------------------- |
| `npm run start-dev`  | Build app continuously (HMR enabled) and serve @ `http://localhost:8080`      |
| `npm run start-prod` | Build app once (HMR disabled) to `/dist/` and serve @ `http://localhost:3000` |
| `npm run build`      | Build app to `/dist/`                                                         |
| `npm run test`       | Run tests                                                                     |
| `npm run lint`       | Run linter                                                                    |
| `npm run lint --fix` | Run linter and fix issues                                                     |
| `npm run start`      | (alias of `npm run start-dev`)                                                |
