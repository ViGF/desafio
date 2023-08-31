import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E1F24',
        secondary: '#2E2E38',
        blue: '#30A9DD',
        smoke: '#D9D9D9',
      },
      textColor: {
        default: '#D9D9D9',
      },
      backgroundColor: {
        default: '#1E1F24',
      },
    },
  },
  plugins: [],
}
export default config
