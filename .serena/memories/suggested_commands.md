# PersonaPass Development Commands

## Development Commands
```bash
# Start development server with Turbo
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Preview build locally
npm run preview
```

## Code Quality Commands
```bash
# Run linting
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Check TypeScript types
npm run typecheck

# Run both linting and type checking
npm run check

# Format code with Prettier
npm run format:write

# Check code formatting
npm run format:check
```

## Deployment
- The project is configured for Vercel deployment
- Uses Next.js 15 with app router
- Production build creates optimized static assets

## Development Workflow
1. Run `npm run dev` to start development server
2. Make changes to components in `src/components/`
3. Test styling with Tailwind CSS classes
4. Run `npm run check` before committing
5. Use `npm run format:write` to format code

## Important Notes
- Tailwind CSS is in production dependencies for Vercel builds
- PostCSS configuration handles Tailwind processing
- Custom Web3 design system is in `src/styles/globals.css`
- Framer Motion handles all animations and transitions