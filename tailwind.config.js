/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ['class', '.dark-mode'],
  theme: {
    extend: {
      darkMode: 'data-theme',
      colors: {


        text_: "#131414", 
        main_text:"#102f94",
        deep_primary_text:"#002ead",

        secondary_text:"#0eb0a1",
        link_text:"#aa10b5",

        secondary_btn: "#14ccbb",
        secondary_btn_hover : "#0eb0a1",

        secondary: "#5C6BC0",
        secondary_hover: "#5C6BD0", 


        background: "#f7f8fa", 

        textPrimary: "#131313", 

        textSecondary: "#0f0f0f", 

        
        cardBg: "#f2f4f5", 
        card_bg_hover: "#d6f0ff",

        cardBorder: "#D1D5DB",







        red_text: "#f44336",
        red_bg: 'rgba(244, 67, 54, 0.15)',
        red_bg_hover: 'rgba(244, 67, 54, 0.25)',

        green_text: "#4caf50",
        green_bg: 'rgba(10,210,110,.1)',
        green_bg_hover: 'rgba(10,210,110,.2)',

        yellow_text: "#ffeb3b",
        yellow_bg: 'rgba(255,235,59,.1)',
        yellow_bg_hover: 'rgba(255,235,59,.2)',

        cyan_text: "#00bcd4",
        cyan_bg: 'rgba(0,188,212,.1)',
        cyan_bg_hover: 'rgba(0,188,212,.2)',

        purple_text: "#9c27b0",
        purple_bg: 'rgba(156,39,176,.1)',
        purple_bg_hover: 'rgba(156,39,176,.2)',

        orange_text: "#ff9800",
        orange_bg: 'rgba(255,152,0,.1)',
        orange_bg_hover: 'rgba(255,152,0,.2)',

        pink_text: "#e91e63",
        pink_bg: 'rgba(233,30,99,.1)',
        pink_bg_hover: 'rgba(233,30,99,.2)',

        indigo_text: "#3f51b5",
        indigo_bg: 'rgba(63,81,181,.1)',
        indigo_bg_hover: 'rgba(63,81,181,.2)',

        blue_text: "#2196f3",
        blue_bg: 'rgba(33,150,243,.1)',
        blue_bg_hover: 'rgba(33,150,243,.2)',

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
        '3xl': '1920px',

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
        primary_font: ["Poppins", "sans-serif"],
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
      backgroundImage: {
        'primary_btn_dark': 'linear-gradient(to top right, #6573f0, #5c6af7)',
        'primary_btn_light': 'linear-gradient(to top right, #8d97f0, #8690f7)',

        'primary_btn_dark_hover': 'linear-gradient(to top right, #7a87fa, #5f6ce8)',
        'primary_btn_light_hover': 'linear-gradient(to top right, #818be6, #7a84eb)',

        'primary_btn_bg_very_light': 'linear-gradient(to top right, #cacded, #a0a7f2)',

      },


    },

  },
  plugins: [],
};
