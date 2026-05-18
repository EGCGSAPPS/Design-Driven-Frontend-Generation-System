# Shadows

## Shadow Scale

| Token     | Value                        | Usage                          |
| --------- | ---------------------------- | ------------------------------ |
| shadow-sm | 0 1px 2px rgba(0,0,0,0.05)   | Subtle elevation (inputs)      |
| shadow-md | 0 4px 6px rgba(0,0,0,0.1)    | Cards and raised elements      |
| shadow-lg | 0 10px 15px rgba(0,0,0,0.15) | Modals and floating components |

---

## Usage Guidelines

- Use shadows to indicate elevation and hierarchy
- Apply shadow-sm to form inputs and buttons
- Use shadow-md for cards and panels
- Reserve shadow-lg for modals, dropdowns, and overlays
- Avoid excessive shadows that create visual noise
- Combine shadows with border-radius for polished appearance

---

## Component Mapping

| Component | Shadow    | Additional Styles |
| --------- | --------- | ----------------- |
| Card      | shadow-md | rounded-lg        |
| Modal     | shadow-lg | rounded-lg        |
| Dropdown  | shadow-lg | rounded-md        |
| Button    | shadow-sm | hover:shadow-md   |
| Input     | shadow-sm | focus:shadow-md   |
| Table     | none      | border only       |

---

## Tailwind Classes

```tsx
// Card
className = "shadow-md rounded-lg";

// Modal
className = "shadow-lg rounded-lg";

// Interactive Button
className = "shadow-sm hover:shadow-md transition-shadow";

// Flat Element
className = "shadow-none border border-gray-300";
```

---

## Accessibility

- Shadows should not be the only indicator of interactivity
- Combine with focus rings for keyboard navigation
- Ensure sufficient contrast between shadowed elements and backgrounds
