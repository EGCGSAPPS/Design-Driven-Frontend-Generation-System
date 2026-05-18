# Typography

## Type Scale

| Token      | Size | Weight | Line Height | Usage           |
| ---------- | ---- | ------ | ----------- | --------------- |
| heading-xl | 32px | 700    | 1.2         | Page Headers    |
| heading-lg | 24px | 700    | 1.3         | Section Headers |
| heading-md | 20px | 600    | 1.4         | Card Titles     |
| body-lg    | 16px | 400    | 1.5         | Main Content    |
| body-md    | 14px | 400    | 1.5         | Table Content   |
| body-sm    | 12px | 400    | 1.4         | Labels          |

---

## Font Families

- **Primary**: Inter, system-ui, -apple-system, sans-serif
- **Monospace**: 'Fira Code', Consolas, monospace (for code snippets)

---

## Usage Guidelines

- Use semantic heading hierarchy (h1 → h2 → h3)
- Maintain consistent line heights for readability
- Use font weights to establish visual hierarchy
- Keep body text at 14-16px for optimal readability
- Use 12px only for labels and secondary metadata

---

## Tailwind Classes

| Token      | Tailwind Class          |
| ---------- | ----------------------- |
| heading-xl | `text-3xl font-bold`    |
| heading-lg | `text-2xl font-bold`    |
| heading-md | `text-xl font-semibold` |
| body-lg    | `text-base font-normal` |
| body-md    | `text-sm font-normal`   |
| body-sm    | `text-xs font-normal`   |
