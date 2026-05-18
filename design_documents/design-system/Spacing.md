# Spacing

## Spacing Scale

| Token     | Value | Tailwind Class | Usage                 |
| --------- | ----- | -------------- | --------------------- |
| spacing-1 | 4px   | `space-1`      | Tight spacing (icons) |
| spacing-2 | 8px   | `space-2`      | Compact elements      |
| spacing-3 | 12px  | `space-3`      | Form field gaps       |
| spacing-4 | 16px  | `space-4`      | Standard padding      |
| spacing-5 | 20px  | `space-5`      | Section spacing       |
| spacing-6 | 24px  | `space-6`      | Card padding          |
| spacing-8 | 32px  | `space-8`      | Large section gaps    |

---

## Layout Spacing

| Component  | Padding | Gap  |
| ---------- | ------- | ---- |
| Card       | 24px    | 16px |
| Modal      | 24px    | 20px |
| Form       | 16px    | 12px |
| Table Cell | 12px    | -    |
| Button     | 12px    | 8px  |
| Input      | 12px    | -    |

---

## Usage Guidelines

- Use consistent spacing throughout the application
- Prefer multiples of 4px for alignment
- Apply spacing-4 (16px) as the default standard
- Use spacing-6 (24px) for card/section padding
- Use spacing-2/3 (8-12px) for form elements
- Maintain vertical rhythm with consistent gaps

---

## Common Patterns

```tsx
// Card
className = "p-6 space-y-4";

// Form
className = "space-y-3";

// Button Group
className = "flex gap-2";

// Section
className = "mb-8";
```
