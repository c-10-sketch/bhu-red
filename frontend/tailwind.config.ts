import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        neon: "0 0 20px rgba(56, 189, 248, 0.45), 0 0 40px rgba(168, 85, 247, 0.25)"
      },
      animation: {
        "spin-slow": "spin 6s linear infinite",
        float: "float 4s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        }
      }
    }
  },
  plugins: []
} satisfies Config;
