# PersonaPass Code Style & Conventions

## TypeScript Conventions
- **Strict TypeScript**: All files use TypeScript with strict mode
- **Interface Definitions**: Use `interface` for object shapes, `type` for unions/primitives
- **Props Typing**: Component props are explicitly typed with interfaces
- **File Naming**: kebab-case for component files (e.g., `hero-section-v2.tsx`)

## React/Next.js Patterns
- **"use client" Directive**: Added to components using client-side features (hooks, animations)
- **Component Structure**: Functional components with hooks
- **Imports**: Absolute imports using `@/` path mapping
- **Server/Client Components**: Clear separation between server and client components

## Styling Conventions
- **Tailwind CSS**: Primary styling system with custom Web3 design tokens
- **Class Organization**: Responsive classes follow mobile-first approach
- **Custom Classes**: Web3-specific classes in `globals.css` (glass-card, gradient-mesh, neon-glow)
- **Component Variants**: Use class-variance-authority for component styling variants

## Component Patterns
- **UI Components**: Located in `src/components/ui/` with consistent API
- **Composition**: Components accept `children` and use slot patterns
- **Prop Spreading**: Use `...props` for extending component APIs
- **Refs**: Forward refs for UI components that need DOM access

## Animation Standards
- **Framer Motion**: All animations use framer-motion library
- **Performance**: Use `useTransform` and `useScroll` for scroll-based animations
- **Stagger Effects**: Sequential animations with delay multipliers
- **Viewport Triggers**: `whileInView` for scroll-triggered animations

## Web3 Integration Patterns
- **Wallet Connections**: Centralized in custom hooks
- **Error Handling**: Graceful fallbacks for Web3 operations
- **Type Safety**: Strongly typed blockchain interactions
- **Provider Pattern**: Context providers for Web3 state management

## File Organization
- **Pages**: App router in `src/app/`
- **Components**: Reusable components in `src/components/`
- **Hooks**: Custom hooks in `src/hooks/`
- **Utils**: Helper functions in `src/lib/`
- **Types**: Shared types in `src/types/`