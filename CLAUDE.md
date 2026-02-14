# Heart Locket - Valentine Web App

A Valentine's Day web app where users enter a name and upload a photo, displayed inside an animated 3D heart-shaped locket that opens/closes on click.

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router, RSC enabled)
- **Language:** TypeScript 5.7.3
- **UI:** React 19.2.3, Tailwind CSS 3.4.17, shadcn/ui (Radix UI primitives)
- **Forms:** react-hook-form + zod validation
- **Icons:** lucide-react
- **Fonts:** Inter (sans), Cormorant Garamond (serif)
- **Package Manager:** pnpm (bun.lock also present)

## Project Structure

```
app/
  layout.tsx          # Root layout with fonts and metadata
  page.tsx            # Main page (client component, manages name/image state)
  globals.css         # Global styles, CSS variables, custom keyframes
components/
  heart-locket.tsx    # 3D animated SVG locket (580+ lines, complex SVG/CSS 3D)
  locket-form.tsx     # Name input + photo upload form
  theme-provider.tsx  # next-themes wrapper
  ui/                 # shadcn/ui components (54 files)
hooks/
  use-mobile.tsx      # Mobile detection hook
  use-toast.ts        # Toast notification hook
lib/
  utils.ts            # cn() helper (clsx + tailwind-merge)
styles/               # Additional style files
```

## Commands

```bash
pnpm dev       # Start dev server (--turbo enabled)
pnpm build     # Production build (TS errors ignored in config)
pnpm start     # Start production server
pnpm lint      # Run ESLint
```

## Key Conventions

- **Styling:** Tailwind utility classes + `cn()` helper from `lib/utils.ts` for conditional class merging
- **Theming:** CSS variables in HSL format defined in `globals.css`, dark mode via class strategy
- **Fonts:** `font-sans` = Inter, `font-serif` = Cormorant Garamond (used for elegant/romantic text)
- **Components:** shadcn/ui pattern - components in `components/ui/`, customized via Tailwind
- **Path alias:** `@/*` maps to project root
- **Color scheme:** Warm beige/cream tones (#f7f4f1 base), gold gradients for locket

## Architecture Notes

- All interactive components are client components (`"use client"`)
- State management via React `useState` hooks (no external state library)
- Image handling: FileReader API converts uploads to base64 data URLs client-side
- Heart locket uses inline SVG with multiple clipping paths, gradients, and CSS 3D transforms (`perspective`, `rotateY`) for the door-opening animation
- Custom `swing` keyframe animation for locket pendulum motion
- Responsive: split-screen on desktop (form left, locket right), stacked on mobile
