---
name: frontend-design
description: Use when designing or implementing frontend components, layouts, UI/UX improvements, responsive design, accessibility, or visual styling changes. Covers component architecture, styling patterns, user interactions, and design system implementation.
---

# Frontend Design Skill

**Version:** 1.0 · April 2026  
**License:** MIT  
**Stack:** Next.js 14, React, Tailwind CSS, TypeScript

## When to Use This Skill

Use this skill when:

- Designing new UI components or layouts
- Implementing responsive design or mobile optimization
- Working on accessibility (a11y) features
- Creating or updating design system components
- Improving user experience and interactions
- Adding animations or visual feedback
- Refactoring component structure
- Implementing state management for UI components
- Working with forms and user input validation
- Optimizing frontend performance

## Core Principles

### 1. Mobile-First Responsive Design

- Design for mobile screens first (320px+), then scale up
- Use Tailwind's responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Test breakpoints: 640px, 768px, 1024px, 1280px, 1536px
- Ensure touch targets are at least 44×44px

### 2. Accessibility (WCAG 2.1 AA)

- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`
- ARIA labels on interactive elements: `aria-label`, `aria-describedby`
- Keyboard navigation: all actions accessible via Tab and Enter/Space
- Color contrast: minimum 4.5:1 for text, 3:1 for large text
- Focus indicators: visible focus rings on all interactive elements
- Screen reader testing with NVDA/VoiceOver

### 3. Performance

- Lazy load images and components
- Code splitting with React.lazy() and Next.js dynamic imports
- Optimize images: WebP format, srcset, lazy loading
- Minimize re-renders with React.memo, useMemo, useCallback
- Bundle size monitoring: keep main bundle < 250KB gzipped

### 4. Component Architecture

- Single Responsibility: one component = one concern
- Composition over inheritance
- Props drilling < 3 levels (use Context for deeper state)
- Container/Presentational pattern when needed
- Custom hooks for reusable logic

## Design System Standards

### Color Palette (SpectraMаяк)

```css
/* Primary - trustworthy blue */
primary: #3B82F6 /* blue-500 */
primary-hover: #2563EB /* blue-600 */
primary-light: #DBEAFE /* blue-100 */

/* Secondary - calming teal */
secondary: #14B8A6 /* teal-500 */
secondary-hover: #0D9488 /* teal-600 */

/* Neutral */
text-primary: #1F2937 /* gray-800 */
text-secondary: #6B7280 /* gray-500 */
bg-primary: #FFFFFF
bg-secondary: #F9FAFB /* gray-50 */

/* Semantic */
success: #10B981 /* green-500 */
warning: #F59E0B /* amber-500 */
error: #EF4444 /* red-500 */
```

### Typography Scale

```css
/* Headings */
text-4xl: 2.25rem (36px) - Page title
text-3xl: 1.875rem (30px) - Section title
text-2xl: 1.5rem (24px) - Subsection title
text-xl: 1.25rem (20px) - Card title

/* Body */
text-base: 1rem (16px) - Default body
text-sm: 0.875rem (14px) - Secondary text
text-xs: 0.75rem (12px) - Labels, captions

/* Weights */
font-normal: 400 - Body text
font-medium: 500 - Emphasized text
font-semibold: 600 - Headings
font-bold: 700 - Page titles
```

### Spacing System

```css
/* Tailwind spacing scale */
space-1: 0.25rem (4px)
space-2: 0.5rem (8px)
space-3: 0.75rem (12px)
space-4: 1rem (16px) - Default gap
space-6: 1.5rem (24px) - Section spacing
space-8: 2rem (32px) - Component spacing
```

## Component Templates

### Button Component

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  secondary: "bg-teal-500 hover:bg-teal-600 text-white",
  outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-50",
  ghost: "text-gray-600 hover:bg-gray-100",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};
```

### Form Input Component

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

// Accessibility: aria-describedby for error/helper text
// id + htmlFor connection
// error state styling
// focus ring visibility
```

### Card Component

```tsx
interface CardProps {
  header?: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

// Consistent padding, shadow, rounded corners
// Hover elevation effect
// Responsive spacing
```

## Responsive Patterns

### Mobile-First Layout

```tsx
// Mobile: single column (default)
<div className="flex flex-col gap-4">
  {/* content */}
</div>

// Tablet: 2 columns
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* content */}
</div>

// Desktop: 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* content */}
</div>
```

### Container Pattern

```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  {/* Centered content with responsive padding */}
</div>
```

## State Management Patterns

### Local Component State

```tsx
// Use useState for simple component state
const [isOpen, setIsOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState<string | null>(null);
```

### Context for Shared State

```tsx
// Create context for theme, auth, user preferences
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Provider wraps application or subtree
<ThemeProvider>
  <App />
</ThemeProvider>
```

### Server State (Next.js 14)

```tsx
// Server Components by default (default in Next.js 14)
async function getData() {
  const res = await fetch("https://api.example.com/data");
  return res.json();
}

// Client Components for interactivity
("use client");
import { useState } from "react";
```

## Form Handling

### Controlled Components

```tsx
const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};
```

### Validation

```tsx
// Client-side validation with error messages
// Real-time feedback on blur/change
// Accessibility: aria-invalid, aria-describedby
```

### Form Submission

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validate
  if (!validateForm(formData)) return;

  // Submit
  try {
    await submitForm(formData);
    // Success feedback
  } catch (error) {
    // Error handling with user-friendly message
  }
};
```

## Accessibility Checklist

- [ ] All images have alt text (or `alt=""` for decorative)
- [ ] Form inputs have associated labels (or `aria-label`)
- [ ] Buttons have descriptive text (not just "click here")
- [ ] Color contrast meets WCAG AA standards
- [ ] Keyboard navigation works for all interactions
- [ ] Focus indicators are visible
- [ ] ARIA roles and attributes used correctly
- [ ] Semantic HTML elements (`<nav>`, `<main>`, etc.)
- [ ] Screen reader testing completed
- [ ] Touch targets are minimum 44×44px

## Performance Checklist

- [ ] Images optimized (WebP, proper sizing)
- [ ] Lazy loading implemented for images/components
- [ ] Code splitting configured
- [ ] Bundle size monitored and optimized
- [ ] Unnecessary re-renders minimized
- [ ] Memoization used where appropriate
- [ ] CSS optimized (Tailwind purging)
- [ ] Fonts optimized (subset, preload)

## Testing Strategy

### Visual Regression Testing

- Storybook for component documentation
- Chromatic or Percy for visual diff testing
- Test across browsers: Chrome, Firefox, Safari, Edge

### Accessibility Testing

- axe DevTools for automated a11y testing
- Keyboard navigation testing
- Screen reader testing (NVDA/VoiceOver)

### Responsive Testing

- Chrome DevTools device emulation
- Real device testing when possible
- Test at all breakpoints

## Common Patterns

### Loading States

```tsx
if (loading) {
  return <LoadingSpinner />;
}
```

### Error States

```tsx
if (error) {
  return <ErrorMessage message={error.message} />;
}
```

### Empty States

```tsx
if (items.length === 0) {
  return <EmptyState message="Нет данных" />;
}
```

## Migration Guide

When refactoring existing components:

1. Create new component alongside old one
2. Test new component thoroughly
3. Migrate usage incrementally
4. Remove old component after migration complete

## Integration with SpectraMаяk

This skill integrates with:

- **Next.js 14** App Router architecture
- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **React** for component-based UI
- Project-specific business logic in `.business/`

## Related Skills

- **bulletproof**: For full development workflow
- **claude-api**: For API integrations
- **daily-report**: For progress tracking

## Sources and References

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/)
