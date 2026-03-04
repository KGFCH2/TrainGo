/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
                    400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
                    800: '#1e40af', 900: '#1e3a8a', 950: '#172554',
                },
                accent: {
                    50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
                    400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
                },
                surface: {
                    50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1',
                    700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617',
                },
                saffron: '#FF9933',
                'indian-green': '#138808',
            },
            fontFamily: {
                sans: ['Rozha One', 'Inter', 'system-ui', 'sans-serif'],
                display: ['Rozha One', 'Space Grotesk', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'fade-in': 'fadeIn 0.6s ease-out forwards',
                'slide-up': 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
                'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
                'spin-slow': 'spin 8s linear infinite',
                'blink': 'blink 0.8s step-end infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                pulseSubtle: {
                    '0%, 100%': { opacity: '0.4' },
                    '50%': { opacity: '0.7' },
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
};
