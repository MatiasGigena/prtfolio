/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '375px',
        xsm: '475px',
        xxl: '1440px',
        xlxl: '1920px',
      },
      colors: {
        black: '#000000',
        sec: '#ffffff',
      },
      backgroundImage: {
        HKanimate:
          "url('/huntek/logo-text-animate/W(D).svg')",
        HKtext: "url('/huntek/logo-text/W(D).svg')",
        HKGtext: "url('/huntek/logo-text/G(D).svg')",
        HKlogo: "url('/huntek/logo/W.svg')",
        HKGlogo: "url('/huntek/logo/G.svg')",
        Huntek: "url('/huntek/text/W(D).svg')",
      },
    },
  },
  plugins: [require('daisyui')],
};
