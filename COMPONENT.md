# WebcamButton Component

## Quick Copy-Paste

Copy these files to your project:

### 1. Component File
`components/ui/webcam-button.tsx`

### 2. Utils File (if you don't have it)
`lib/utils.ts`

### 3. CSS Animation
Add to your `globals.css`:

```css
@keyframes shine {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.shine-animation {
  animation: shine 2s ease-in-out infinite;
}
```

## Installation

```bash
pnpm add clsx tailwind-merge
# or
npm install clsx tailwind-merge
```

## Basic Import

```tsx
import { WebcamButton } from "@/components/ui/webcam-button";
```

## File Structure

```
your-project/
├── components/
│   └── ui/
│       └── webcam-button.tsx
├── lib/
│   └── utils.ts
└── app/
    └── globals.css (add animation)
```
