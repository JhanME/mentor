import type {Config} from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // AQUÍ AGREGAMOS LA FUENTE
      fontFamily: {
        // Opción 1: Esto hace que Nunito sea la fuente por defecto en toda la app
        sans: ["var(--font-nunito)", "sans-serif"],
        
        // Opción 2: Si prefieres usarla manualmente como 'font-nunito'
        // nunito: ["var(--font-nunito)"], 
      },
    },
  },
  plugins: [],
};
export default config;
