# Project guidance

## Stack

- React 19 with JavaScript and JSX.
- Vite provides the development server and production build.
- Oxlint is the configured linter.
- Node's built-in test runner (`node:test`) runs unit tests; do not install a test framework for this project.

## Folder layout

- `src/App.jsx`: application composition and application state.
- `src/components/`: reusable UI components, one component per file.
- `src/expenseUtils.js`: expense input validation helpers.
- `src/*.css`: global styles (`index.css`) and app styles (`App.css`).
- `test/`: Node test-runner tests.
- `public/`: static assets served from the site root.

## Install, test, lint, and build

- Install dependencies: `npm install`
- Run tests: `npm test`
- Lint: `npm run lint`
- Create a production build: `npm run build`
- Start the development server: `npm run dev`

## Conventions and workflow

- Keep application state in `App`; pass values and callbacks to child components through props.
- Put each React component in its own file under `src/components/` (with `App` in `src/App.jsx`).
- Use the existing stack and patterns; ask before adding any dependency.
- Work on a branch for each change; do not work directly on the default branch.
- Summarize the changes and relevant test results in the pull request.
