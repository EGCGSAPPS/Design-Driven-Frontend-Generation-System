# Copilot Instructions

## Coding standards
- Use functional React components with TypeScript interfaces.
- Keep code modular, reusable, and feature-focused.
- Avoid duplication in API and validation logic.

## Architecture rules
- Route definitions must be centralized in `src/routes`.
- Shared platform concerns live under `src/services`, `src/store`, `src/constants`, and `src/validations`.
- Prefer composition through reusable hooks and components.

## Naming conventions
- Components: PascalCase.
- Hooks: `use` prefix.
- Constants: `UPPER_SNAKE_CASE` for primitive constants.
- File names should reflect exported symbols.

## Tailwind rules
- Use theme token classes from `tailwind.config.ts`.
- No inline styles and no hardcoded color hex values in components.
- Prefer semantic utility combinations (`bg-surface`, `text-primary`).

## Redux rules
- Keep async logic in `createAsyncThunk`.
- Use typed hooks from `src/store/hooks.ts`.
- Keep slice state normalized and serializable.

## Form rules
- Use React Hook Form components from `src/components/forms`.
- Use Zod schemas from `src/validations`.
- Surface errors via accessible `aria-describedby` and `role="alert"`.

## Accessibility rules
- All interactive controls require keyboard support.
- Inputs must have labels.
- Decorational icons/images should be hidden from assistive tech.

## Testing rules
- Add RTL tests for components and behavior.
- Add unit tests for store slices and utilities.
- Keep tests deterministic and focused.
