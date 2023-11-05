/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ['class', '.dark-mode'],
  theme: {
    extend: {
      darkMode: 'data-theme',
      colors: {
        dark_primary: "#3D5FD6", // Primary color (e.g., for buttons)
        dark_secondary: "#68D2CD", // Secondary color (e.g., for links)
        dark_background: "#1F2937", // Main background color
        dark_textPrimary: "#F9FAFB", // Primary text color
        dark_textSecondary: "#A7B6C2", // Secondary text color
        dark_cardBg: "#374151", // Card background color
        dark_cardBorder: "#4B5563", // Card border color
        dark_buttonHover: "#C4B5FD", // Button hover color (light theme)

        primary: "#0eb0a1", // Primary color (e.g., for buttons)
        primary_hover: "#009688", // Primary color (e.g., for buttons)

        secondary: "#9342f5", // Secondary color (e.g., for links)
        secondary_hover: "#721adb", // Secondary color (e.g., for links)


        background: "#faf5f5", // Main background color white

        textPrimary: "#131313", // Primary text color main black

        textSecondary: "#0f0f0f", // Secondary text color dark black

        
        cardBg: "#F3F4F6", // Card background color

        cardBorder: "#D1D5DB", // Card border color



        yellow_: "#edd993", // Accent color: yellow
        yellow_hover: "#d4bf79", // Accent color: yellow

        green_: "#deeddd", // Accent color: green
        green_hover: "#cadcc8", // Accent color: green

        blue_: "#dfe7f1", // Accent color: blue
        blue_hover: "#b8c0cb", // Accent color: blue

        red_: "#e9e0e0", // Accent color: red
        red_hover: "#d5c8c8", // Accent color: red


        error_red: "#EE3E54", // Accent color: red


        error_color: "#EF4444",
        info_clor: "#3B82F6",
        success_color: "#22C55E",
        warning_color: "#F97316",


      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',

      },
      screens: {
        'vs': '320px',
        'ms': '420px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',

      },
      spacing: {
        '80': '20rem',
        '96': '24rem',
        
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['ui-serif', 'Georgia'],
        mono: ['ui-monospace', 'SFMono-Regular'],
        display: ['Oswald'],
        body: ['Open Sans'],
        //lato font as primary_font
        primary_font: ['Lato'],
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      borderWidth: {
        '3': '3px',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '0': '0ms',
        '2000': '2000ms',
      },
      transitionTimingFunction: {
        'in': 'ease-in',
        'out': 'ease-out',
        'in-out': 'ease-in-out',
      },
      transitionDelay: {
        '0': '0ms',
        '2000': '2000ms',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
      },
      


    },

  },
  plugins: [],
};
