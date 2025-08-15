import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            fontFamily: {
                'space': ['Space Grotesk', 'ui-sans-serif', 'system-ui'],
                'inter': ['Inter', 'ui-sans-serif', 'system-ui'],
            },
            colors: {
                // Core system colors
                border: 'hsl(var(--border))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                
                // Primary brand colors
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    hover: 'hsl(var(--primary-hover))',
                    active: 'hsl(var(--primary-active))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                
                // Component colors
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                
                // Semantic colors
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                success: 'hsl(var(--quantum-green))',
                warning: 'hsl(var(--warning))',
                error: 'hsl(var(--error))',
                
                // Premium Web3 palette
                electric: {
                    blue: 'hsl(var(--electric-blue))',
                },
                neon: {
                    purple: 'hsl(var(--neon-purple))',
                },
                cyber: {
                    cyan: 'hsl(var(--cyber-cyan))',
                },
                plasma: {
                    pink: 'hsl(var(--plasma-pink))',
                },
                quantum: {
                    green: 'hsl(var(--quantum-green))',
                },
                void: {
                    black: 'hsl(var(--void-black))',
                },
                pearl: {
                    white: 'hsl(var(--pearl-white))',
                }
            },
            
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            
            boxShadow: {
                'depth-1': 'var(--shadow-depth-1)',
                'depth-2': 'var(--shadow-depth-2)',
                'depth-3': 'var(--shadow-depth-3)',
                'depth-4': 'var(--shadow-depth-4)',
                'depth-5': 'var(--shadow-depth-5)',
                'glow-primary': 'var(--glow-primary)',
                'glow-secondary': 'var(--glow-secondary)',
                'glow-accent': 'var(--glow-accent)',
                'glow-success': 'var(--glow-success)',
                'glass': 'var(--glass-shadow)',
            },
            
            backgroundImage: {
                'gradient-primary': 'var(--gradient-primary)',
                'gradient-secondary': 'var(--gradient-secondary)',
                'gradient-mesh': 'var(--gradient-mesh)',
                'gradient-glass': 'var(--gradient-glass)',
                'gradient-border': 'var(--gradient-border)',
                'gradient-orb': 'var(--gradient-orb)',
            },
            
            keyframes: {
                // Standard shadcn animations
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                
                // Custom cyber animations
                'cyber-pulse': {
                    '0%, 100%': { opacity: '0.5' },
                    '50%': { opacity: '1' }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                'slide-up': {
                    '0%': { transform: 'translateY(100px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                'slide-down': {
                    '0%': { transform: 'translateY(-100px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                'scale-in': {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' }
                },
                'particle-float': {
                    '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
                    '33%': { transform: 'translate3d(30px, -30px, 0)' },
                    '66%': { transform: 'translate3d(-20px, 20px, 0)' }
                }
            },
            
            animation: {
                // Standard animations
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                
                // Custom animations
                'cyber-pulse': 'cyber-pulse 2s ease-in-out infinite alternate',
                'float': 'float 6s ease-in-out infinite',
                'slide-up': 'slide-up 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                'slide-down': 'slide-down 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                'fade-in': 'fade-in 0.6s ease-out',
                'scale-in': 'scale-in 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                'shimmer': 'shimmer 2s linear infinite',
                'particle-float': 'particle-float 20s ease-in-out infinite',
            },
            
            transitionTimingFunction: {
                'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;