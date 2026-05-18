# Generate Form Prompt

## Objective

Generate a fully validated, accessible form using React Hook Form 7.75.0 and Zod 4.4.3 with reusable form components from `src/components/forms`.

## Tech Stack Requirements

- **React Hook Form** 7.75.0 - Form state management
- **@hookform/resolvers** 5.2.2 - Validation resolvers
- **Zod** 4.4.3 - TypeScript-first schema validation
- **Tailwind CSS** 3.4.19 - Styling
- **React** 19.2.6 - UI framework

## Form Structure

### File Organization

```
src/
├── components/forms/          # Reusable form components
│   ├── FormInput.tsx         # Text input wrapper
│   ├── FormSelect.tsx        # Select dropdown wrapper
│   ├── FormTextarea.tsx      # Textarea wrapper
│   ├── FormCheckbox.tsx      # Checkbox wrapper
│   ├── FormDatePicker.tsx    # Date picker wrapper
│   └── FormAutoComplete.tsx  # Autocomplete wrapper
│
├── validations/               # Validation schemas
│   ├── helpers.ts            # Validation helpers
│   ├── constants.ts          # Validation messages
│   └── [formName]Schema.ts   # Form-specific schema
│
└── pages/[PageName]/
    └── [FormName]Form.tsx    # Form component
```

## Zod Schema Creation

### 1. Create Validation Schema

File: `src/validations/[formName]Schema.ts`

```typescript
import { z } from 'zod'
import { emailString, requiredString } from './helpers'
import { VALIDATION_MESSAGES } from './constants'

export const [formName]Schema = z.object({
  // Text fields
  name: requiredString('Name'),
  email: emailString,

  // Optional fields
  phone: z.string().optional(),

  // Number fields
  age: z.number().min(18, VALIDATION_MESSAGES.minAge).max(100),

  // Boolean fields
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),

  // Date fields
  birthDate: z.date().max(new Date(), 'Birth date cannot be in the future'),

  // Select/Enum fields
  role: z.enum(['admin', 'user', 'guest'], {
    errorMap: () => ({ message: 'Please select a valid role' }),
  }),

  // Array fields
  tags: z.array(z.string()).min(1, 'At least one tag is required'),

  // Conditional validation
  password: z.string().min(8, VALIDATION_MESSAGES.minPassword),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

// Export type
export type [FormName]FormValues = z.infer<typeof [formName]Schema>
```

### 2. Validation Helpers

File: `src/validations/helpers.ts`

```typescript
import { z } from "zod";

export const requiredString = (fieldName: string) =>
  z.string().min(1, `${fieldName} is required`);

export const emailString = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email address");

export const optionalString = z.string().optional();

export const phoneString = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
  .optional();

export const urlString = z.string().url("Invalid URL").optional();
```

### 3. Validation Constants

File: `src/validations/constants.ts`

```typescript
export const VALIDATION_MESSAGES = {
  required: "This field is required",
  minPassword: "Password must be at least 8 characters",
  invalidEmail: "Invalid email address",
  minAge: "Must be at least 18 years old",
  maxLength: (max: number) => `Maximum ${max} characters allowed`,
  minLength: (min: number) => `Minimum ${min} characters required`,
} as const;
```

## Form Component Implementation

### Form Component Template

```typescript
import { zodResolver } from '@hookform/resolvers/zod'
import { type FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '../components/common/Button'
import { FormInput } from '../components/forms/FormInput'
import { FormSelect } from '../components/forms/FormSelect'
import { FormCheckbox } from '../components/forms/FormCheckbox'
import { [formName]Schema, type [FormName]FormValues } from '../validations/[formName]Schema'

interface [FormName]FormProps {
  onSubmit: (data: [FormName]FormValues) => void | Promise<void>
  defaultValues?: Partial<[FormName]FormValues>
  isLoading?: boolean
}

export const [FormName]Form: FC<[FormName]FormProps> = ({
  onSubmit,
  defaultValues,
  isLoading = false,
}) => {
  const methods = useForm<[FormName]FormValues>({
    resolver: zodResolver([formName]Schema),
    defaultValues: {
      name: '',
      email: '',
      termsAccepted: false,
      ...defaultValues,
    },
  })

  const handleSubmit = async (data: [FormName]FormValues) => {
    try {
      await onSubmit(data)
      methods.reset()
    } catch (error) {
      // Handle error
      console.error('Form submission error:', error)
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="space-y-6"
        noValidate
      >
        {/* Text Input */}
        <FormInput<[FormName]FormValues>
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          required
        />

        {/* Email Input */}
        <FormInput<[FormName]FormValues>
          name="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          required
        />

        {/* Select Dropdown */}
        <FormSelect<[FormName]FormValues>
          name="role"
          label="Role"
          options={[
            { value: 'admin', label: 'Administrator' },
            { value: 'user', label: 'User' },
            { value: 'guest', label: 'Guest' },
          ]}
          required
        />

        {/* Checkbox */}
        <FormCheckbox<[FormName]FormValues>
          name="termsAccepted"
          label="I accept the terms and conditions"
        />

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Submit
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => methods.reset()}
            disabled={isLoading}
          >
            Reset
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
```

## Form Components Usage

### FormInput

```typescript
<FormInput<FormValues>
  name="fieldName"
  label="Field Label"
  type="text" // text | email | password | number | tel | url
  placeholder="Placeholder text"
  required
  disabled={isLoading}
/>
```

### FormSelect

```typescript
<FormSelect<FormValues>
  name="fieldName"
  label="Select Label"
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
  required
/>
```

### FormTextarea

```typescript
<FormTextarea<FormValues>
  name="fieldName"
  label="Textarea Label"
  placeholder="Enter your text"
  rows={5}
  required
/>
```

### FormCheckbox

```typescript
<FormCheckbox<FormValues>
  name="fieldName"
  label="Checkbox Label"
/>
```

### FormDatePicker

```typescript
<FormDatePicker<FormValues>
  name="fieldName"
  label="Date Label"
  required
/>
```

## Requirements Checklist

### 1. Schema Validation

- [ ] Create Zod schema in `src/validations/`
- [ ] Export TypeScript type from schema
- [ ] Use validation helpers for common patterns
- [ ] Add custom validation rules with `.refine()`
- [ ] Test schema with valid and invalid data

### 2. Form Setup

- [ ] Use `useForm` with `zodResolver`
- [ ] Wrap form in `FormProvider`
- [ ] Set appropriate default values
- [ ] Add `noValidate` to form element
- [ ] Handle submit with try-catch

### 3. Accessibility

- [ ] All inputs have labels
- [ ] Use `required` attribute for required fields
- [ ] Error messages linked with `aria-describedby`
- [ ] Error messages have `role="alert"`
- [ ] Keyboard navigation works
- [ ] Focus states are visible

### 4. Error Handling

- [ ] Display field errors below inputs
- [ ] Show error summary if needed
- [ ] Highlight invalid fields visually
- [ ] Clear errors on field change
- [ ] Handle server-side errors

### 5. Loading States

- [ ] Disable form during submission
- [ ] Show loading indicator on submit button
- [ ] Prevent double submission
- [ ] Disable reset button during submission

### 6. User Experience

- [ ] Clear error messages
- [ ] Real-time validation feedback
- [ ] Reset form after successful submission
- [ ] Confirm before discarding changes
- [ ] Autofocus first field (if appropriate)

### 7. Responsive Design

- [ ] Mobile-friendly layout
- [ ] Touch-friendly input sizes
- [ ] Proper spacing on small screens
- [ ] Stack fields vertically on mobile

## Testing

Create test file: `tests/forms/[FormName]Form.test.tsx`

```typescript
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '../../src/pages/ContactForm'

describe('ContactForm', () => {
  it('validates required fields', async () => {
    const onSubmit = jest.fn()
    render(<ContactForm onSubmit={onSubmit} />)

    const submitButton = screen.getByRole('button', { name: /submit/i })
    await userEvent.click(submitButton)

    expect(await screen.findByText('Name is required')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits valid data', async () => {
    const onSubmit = jest.fn()
    render(<ContactForm onSubmit={onSubmit} />)

    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com')
    await userEvent.click(screen.getByLabelText(/terms/i))

    await userEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        termsAccepted: true,
      })
    })
  })
})
```

## Coding Standards

- Use shared form components from `src/components/forms/`
- Keep validation logic in Zod schemas
- Surface errors accessibly
- Follow project standards from `.github/copilot-instructions.md`

## Deliverables

1. Zod validation schema
2. Form component implementation
3. Proper error handling
4. Accessibility features
5. Loading states
6. Unit tests
7. TypeScript types
8. Responsive layout
