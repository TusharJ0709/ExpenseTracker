# Prompt library

## New feature

**Context:** [Describe the relevant product behavior, code paths, and existing conventions.]

**Goal:** [State the user-visible outcome to implement.]

**Constraints:** [List compatibility, accessibility, dependency, and scope constraints.]

**Acceptance criteria:**
- [Write an observable behavior that can be verified by a test.]
- [Write another independently testable behavior.]

**Examples:** [Give representative inputs and expected outputs or interactions.]

## Bug fix

**Context:** [Describe the affected feature and where the behavior occurs.]

**Goal:** [State the correct behavior and the defect to resolve.]

**Constraints:** [Preserve unrelated behavior; avoid broad rewrites or new dependencies.]

**Acceptance criteria:**
- [Add a regression test that fails before the fix and passes after it.]
- [List relevant existing tests that must continue to pass.]

**Examples:** [Provide a minimal reproduction and the expected result.]

## Refactor

**Context:** [Describe the current implementation and its maintainability issue.]

**Goal:** [Describe the desired internal structure without changing user-visible behavior.]

**Constraints:** [Preserve public APIs, behavior, and existing project conventions.]

**Acceptance criteria:**
- [Name a behavior test that must pass before and after the refactor.]
- [Identify the structural outcome that can be checked in code or tooling.]

**Examples:** [Show a representative before/after API or structure if useful.]

## Generate tests

**Context:** [Name the module, behavior, and current test framework.]

**Goal:** [Describe which behavior and edge cases the tests should cover.]

**Constraints:** [Use the existing test stack; do not change production behavior or add dependencies.]

**Acceptance criteria:**
- [Each test must assert a specific expected result.]
- [The documented test command must run the new tests successfully.]

**Examples:** [Provide representative inputs and expected assertions.]

## Review diff

**Context:** [Describe the purpose of the diff and relevant system behavior.]

**Goal:** Review the diff for actionable correctness, regression, accessibility, and maintainability issues.

**Constraints:** Report only issues introduced by the diff; do not edit files. Include file and line references and explain the impact.

**Acceptance criteria:**
- [Every finding points to an exact changed location and has a reproducible impact.]
- [If there are no actionable issues, state that explicitly.]

**Examples:** [Include an example of a concise finding with impact and suggested correction.]

## Commit message

**Context:** [Summarize the changes included in the staged diff.]

**Goal:** Write a concise commit message that describes the user-facing change.

**Constraints:** Follow the repository's commit style; do not claim changes absent from the diff.

**Acceptance criteria:**
- [The subject uses the required format and length.]
- [The body, if needed, explains why without duplicating the subject.]

**Examples:** [Provide one representative subject/body in the project style.]

## Add expense feature prompt

**Context:** The project is a React 19 and Vite expense tracker. Application state belongs in `src/App.jsx`; UI components live in `src/components/`, and input validation is shared through `src/expenseUtils.js`. Expenses have a title, positive numeric amount, and one of Food, Travel, Bills, or Other.

**Goal:** Implement adding expenses to the tracker. On successful submission, show the new expense in the list, update the total and displayed count, and clear the form.

**Constraints:**
- Keep state in `App` and use one component per file.
- Do not add dependencies.
- Trim titles before storing them.
- Reject empty or whitespace-only titles, empty or non-numeric amounts, and amounts that are zero, negative, or non-finite.
- Preserve the selected category as one of Food, Travel, Bills, or Other.
- Keep validation errors visible and associated with their inputs.

**Acceptance criteria:**
- Submitting a whitespace-only title does not add an expense and shows a title validation error.
- Submitting an empty amount does not add an expense and shows an amount validation error.
- Submitting a non-numeric amount does not add an expense and shows an amount validation error.
- Submitting an amount of zero or less does not add an expense and shows an amount validation error.
- Submitting a non-empty title and a positive finite numeric amount adds exactly one expense with the trimmed title, entered amount, and selected category.
- After a successful submission, the title and amount fields are empty.
- After a successful submission, the displayed expense count increases by one and the running total increases by the submitted amount, rendered with exactly two fractional digits.

**Examples:**
- Input title `"  Market groceries  "`, amount `"24.5"`, category `"Food"`; expected expense title `"Market groceries"`, amount `$24.50`, and category `"Food"`.
- Input title `" "` and amount `"24.5"`; expected no new list item and a title validation message.
- Input title `"Bus pass"` and amount `"-4"`; expected no new list item and an amount validation message.
