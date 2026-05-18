# Styling Guide

## Overview

This application uses Tailwind CSS as the primary styling solution, providing utility-first CSS classes for rapid UI development with consistent design tokens.

## Styling Architecture

```
Styling System
├── Tailwind CSS (Utility-first framework)
├── Custom CSS (Global styles)
├── Design Tokens (Colors, spacing, typography)
└── Component Styles (Scoped styling)
```

## Tailwind CSS Setup

### Configuration

#### Vite Config (`vite.config.ts`)

```typescript
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

#### Global Styles (`index.css`)

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");

@tailwind utilities;
@import "tailwindcss";

:root {
  font-family: Inter, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

::-webkit-scrollbar-corner {
  background: #f1f1f1;
}
```

## Design Tokens

### Color Palette

```typescript
// Tailwind color classes
const colors = {
  // Primary
  primary: "text-primary bg-primary border-primary", // #052760
  heading: "text-heading", // #052760

  // Grayscale
  gray: {
    50: "bg-gray-50", // #F9FAFB
    100: "bg-gray-100", // #F3F4F6
    200: "bg-gray-200", // #E5E7EB
    300: "bg-gray-300", // #D1D5DB
    400: "bg-gray-400", // #9CA3AF
    500: "bg-gray-500 text-gray-500", // #6B7280
    600: "bg-gray-600 text-gray-600", // #4B5563
    700: "bg-gray-700 text-gray-700", // #374151
    800: "bg-gray-800", // #1F2937
    900: "bg-gray-900", // #111827
  },

  // Status Colors
  success: "text-green-600 bg-green-600", // #10B981
  error: "text-red-600 bg-red-600", // #EF4444
  warning: "text-yellow-600 bg-yellow-600", // #F59E0B
  info: "text-blue-600 bg-blue-600", // #3B82F6

  // UI Elements
  border: "border-gray-200 border-gray-300",
  divider: "border-gray-200",
  background: "bg-white bg-gray-50",
};
```

### Typography

```typescript
// Font Sizes
const fontSize = {
  xs: "text-xs", // 0.75rem (12px)
  sm: "text-sm", // 0.875rem (14px)
  base: "text-base", // 1rem (16px)
  lg: "text-lg", // 1.125rem (18px)
  xl: "text-xl", // 1.25rem (20px)
  "2xl": "text-2xl", // 1.5rem (24px)
  "3xl": "text-3xl", // 1.875rem (30px)
  "4xl": "text-4xl", // 2.25rem (36px)
};

// Font Weights
const fontWeight = {
  normal: "font-normal", // 400
  medium: "font-medium", // 500
  semibold: "font-semibold", // 600
  bold: "font-bold", // 700
};

// Font Family
const fontFamily = {
  sans: "font-inter", // Inter
  mono: "font-mono", // Monospace
};
```

### Spacing Scale

```typescript
// Spacing (padding, margin, gap)
const spacing = {
  0: "0",           // 0
  0.5: "0.5",       // 0.125rem (2px)
  1: "1",           // 0.25rem (4px)
  2: "2",           // 0.5rem (8px)
  3: "3",           // 0.75rem (12px)
  4: "4",           // 1rem (16px)
  5: "5",           // 1.25rem (20px)
  6: "6",           // 1.5rem (24px)
  8: "8",           // 2rem (32px)
  10: "10",         // 2.5rem (40px)
  12: "12",         // 3rem (48px)
  16: "16",         // 4rem (64px)
  20: "20",         // 5rem (80px)
};

// Usage
<div className="p-4 m-2 gap-3">  // padding: 16px, margin: 8px, gap: 12px
```

### Border Radius

```typescript
const borderRadius = {
  none: "rounded-none", // 0
  sm: "rounded-sm", // 0.125rem (2px)
  DEFAULT: "rounded", // 0.25rem (4px)
  md: "rounded-md", // 0.375rem (6px)
  lg: "rounded-lg", // 0.5rem (8px)
  xl: "rounded-xl", // 0.75rem (12px)
  "2xl": "rounded-2xl", // 1rem (16px)
  full: "rounded-full", // 9999px
};
```

## Common Utility Patterns

### Layout

```typescript
// Flexbox
<div className="flex items-center justify-between">
<div className="flex flex-col gap-4">
<div className="flex flex-wrap">

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
<div className="grid grid-cols-12">

// Container
<div className="container mx-auto px-4">
<div className="max-w-7xl mx-auto">

// Positioning
<div className="relative">
<div className="absolute top-0 right-0">
<div className="fixed bottom-4 right-4">
<div className="sticky top-0">
```

### Spacing

```typescript
// Padding
<div className="p-4">              // All sides: 16px
<div className="px-4 py-2">        // Horizontal: 16px, Vertical: 8px
<div className="pt-4 pb-8">        // Top: 16px, Bottom: 32px

// Margin
<div className="m-4">              // All sides: 16px
<div className="mx-auto">          // Horizontal: auto (center)
<div className="mt-4 mb-2">        // Top: 16px, Bottom: 8px

// Gap (for flex/grid)
<div className="flex gap-4">       // 16px gap between children
<div className="grid gap-x-4 gap-y-2">  // Different x/y gaps
```

### Typography

```typescript
// Text Size & Weight
<h1 className="text-2xl font-bold">
<p className="text-sm font-normal">
<span className="text-lg font-semibold">

// Text Color
<p className="text-gray-600">
<span className="text-primary">
<a className="text-blue-600 hover:text-blue-800">

// Text Alignment
<div className="text-left">
<div className="text-center">
<div className="text-right">

// Text Transform
<p className="uppercase">
<p className="lowercase">
<p className="capitalize">

// Text Overflow
<p className="truncate">                    // Single line ellipsis
<p className="line-clamp-2">               // Multi-line clamp
<p className="overflow-hidden text-ellipsis">
```

### Colors

```typescript
// Background
<div className="bg-white">
<div className="bg-gray-50">
<div className="bg-blue-600">

// Text
<p className="text-gray-800">
<span className="text-red-600">

// Border
<div className="border border-gray-300">
<div className="border-2 border-blue-500">
<div className="border-t border-b">
```

### Sizing

```typescript
// Width
<div className="w-full">           // 100%
<div className="w-1/2">            // 50%
<div className="w-64">             // 16rem (256px)
<div className="w-screen">         // 100vw

// Height
<div className="h-full">           // 100%
<div className="h-screen">         // 100vh
<div className="h-64">             // 16rem (256px)
<div className="min-h-screen">    // min-height: 100vh

// Max Width
<div className="max-w-sm">         // 24rem (384px)
<div className="max-w-md">         // 28rem (448px)
<div className="max-w-lg">         // 32rem (512px)
<div className="max-w-7xl">        // 80rem (1280px)
```

### Responsive Design

```typescript
// Mobile-first breakpoints
<div className="
  w-full              // < 640px (mobile)
  sm:w-1/2            // ≥ 640px (small tablet)
  md:w-1/3            // ≥ 768px (tablet)
  lg:w-1/4            // ≥ 1024px (desktop)
  xl:w-1/5            // ≥ 1280px (large desktop)
  2xl:w-1/6           // ≥ 1536px (extra large)
">

// Hide/Show based on screen size
<div className="hidden md:block">   // Hidden on mobile, visible on tablet+
<div className="block md:hidden">   // Visible on mobile, hidden on tablet+
```

### Interactive States

```typescript
// Hover
<button className="bg-blue-600 hover:bg-blue-700">
<a className="text-blue-600 hover:underline">

// Focus
<input className="focus:ring-2 focus:ring-blue-500 focus:outline-none">
<button className="focus:ring-2 focus:ring-offset-2">

// Active
<button className="active:bg-blue-800">

// Disabled
<button className="disabled:opacity-50 disabled:cursor-not-allowed">

// Group Hover
<div className="group">
  <span className="group-hover:text-blue-600">Hover parent to change this</span>
</div>
```

### Transitions & Animations

```typescript
// Transitions
<div className="transition-colors duration-200">
<div className="transition-all duration-300 ease-in-out">
<button className="transform hover:scale-105 transition-transform">

// Animations
<div className="animate-spin">      // Spinning loader
<div className="animate-pulse">     // Pulsing effect
<div className="animate-bounce">    // Bouncing effect
```

### Shadows & Effects

```typescript
// Box Shadow
<div className="shadow-sm">         // Small shadow
<div className="shadow">            // Default shadow
<div className="shadow-md">         // Medium shadow
<div className="shadow-lg">         // Large shadow
<div className="shadow-xl">         // Extra large shadow

// Ring (Outline)
<button className="ring-2 ring-blue-500">
<input className="focus:ring-2 focus:ring-blue-500">

// Opacity
<div className="opacity-50">
<div className="hover:opacity-100">
```

## Component Styling Patterns

### Card Component

```typescript
<div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
  <h3 className="text-lg font-semibold mb-2">Card Title</h3>
  <p className="text-sm text-gray-600">Card content goes here</p>
</div>
```

### Button Variants

```typescript
// Primary Button
<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors">
  Primary Action
</button>

// Secondary Button
<button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
  Secondary Action
</button>

// Outline Button
<button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
  Outline Action
</button>
```

### Input Fields

```typescript
<div className="flex flex-col gap-2">
  <label className="text-sm font-medium text-gray-700">
    Email Address
  </label>
  <input
    type="email"
    className="h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
    placeholder="Enter your email"
  />
  <span className="text-xs text-gray-500">Helper text</span>
</div>
```

### Table Styling

```typescript
<div className="overflow-x-auto">
  <table className="w-full">
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
          Header
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      <tr className="hover:bg-gray-50">
        <td className="px-4 py-3 text-sm text-gray-900">
          Data
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### Modal/Dialog

```typescript
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
    <div className="px-6 py-4 border-b border-gray-200">
      <h2 className="text-xl font-semibold">Modal Title</h2>
    </div>
    <div className="px-6 py-4">
      <p className="text-gray-600">Modal content</p>
    </div>
    <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
      <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
        Cancel
      </button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Confirm
      </button>
    </div>
  </div>
</div>
```

## Utility Helper (clsx)

```typescript
import clsx from "clsx";

// Conditional classes
const buttonClasses = clsx(
  "px-4 py-2 rounded",
  isActive && "bg-blue-600 text-white",
  !isActive && "bg-gray-200 text-gray-700",
  isDisabled && "opacity-50 cursor-not-allowed"
);

<button className={buttonClasses}>Click me</button>

// Dynamic variants
const getButtonClass = (variant: string) => clsx(
  "px-4 py-2 rounded transition-colors",
  {
    "bg-blue-600 text-white hover:bg-blue-700": variant === "primary",
    "bg-gray-200 text-gray-800 hover:bg-gray-300": variant === "secondary",
    "border border-gray-300 hover:bg-gray-50": variant === "outline",
  }
);
```

## Best Practices

### 1. Consistency

- Use design tokens for colors, spacing, and typography
- Follow naming conventions
- Reuse utility combinations

### 2. Performance

- Avoid inline styles when possible
- Use Tailwind's JIT mode for optimal bundle size
- Purge unused styles in production

### 3. Maintainability

- Extract common patterns into components
- Use semantic class names for complex patterns
- Document custom utilities

### 4. Accessibility

- Ensure sufficient color contrast (4.5:1 minimum)
- Use focus states for interactive elements
- Provide visible focus indicators

### 5. Responsive Design

- Mobile-first approach
- Test on various screen sizes
- Use responsive utility variants

### 6. Dark Mode (Optional)

```typescript
// Add dark mode support
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
```

## Common Mistakes to Avoid

❌ **Don't**: Inline styles

```typescript
<div style={{ padding: "16px", backgroundColor: "#fff" }}>
```

✅ **Do**: Tailwind utilities

```typescript
<div className="p-4 bg-white">
```

❌ **Don't**: Overly specific classes

```typescript
<div className="px-4 pr-6">  // Conflicting padding-right
```

✅ **Do**: Clear, non-conflicting classes

```typescript
<div className="pl-4 pr-6">
```

❌ **Don't**: Magic numbers

```typescript
<div className="w-[347px] h-[219px]">
```

✅ **Do**: Design system values

```typescript
<div className="w-80 h-56">  // or max-w-md h-48
```

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [clsx Documentation](https://github.com/lukeed/clsx)
