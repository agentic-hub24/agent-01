/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        primary: '#7e22ce',
        base: '#191C24',
        secondary: '#f2f2f2',
        sidebar: '#0f172a1a',
        pp: '#6A62D2',
        textboxbg: '#E5E8ED',
        search: '#f5f5f5'
      },
      colors: {
        primary: '#7e22ce',
        base: '#191C24',
        danger: '#EB1616',
        pp: '#6A62D2',
        textboxbg: '#E5E8ED',
        textboxtext: '#A0A4AD',
        footertext: '#ccc',
        footermenutext: '#999',
        gray: {
          100: '#f9f9f9'
        }
      },
      spacing: {
        'calc-100-subtract-210': 'calc(100% - 210px)'
      },
      textColor: {
        primary: '#7e22ce',
        base: '#191C24',
        pp: '#6A62D2',
        textboxtext: '#A0A4AD'
      },
      borderColor: {
        primary: '#7e22ce',
        base: '#0f172a1a'
      },
      placeholderColor: {
        textboxtext: '#A0A4AD'
      },
      ringColor: {
        pp: '#6A62D2'
      },
      fontFamily: {
        helveticaHv: ['HelveticaNeueLT-Hv'],
        helveticaNeueLTRoman: ['HelveticaNeueLT-Roman'],
        helveticaNeueLTBd: ['HelveticaNeueLT-Bd'],
        helveticaNeuLight: ['Helvetica Neue Light'],
        helveticaLight: ['Helvetica-Light'],
        helveticaMedium: ['HelveticaMedium'],
        helvetica: ['Helvetica'],
        helvaticaFont: ['HelveticaMedium, Helvetica,sans-serif'],
        helveticaGroup: [
          'HelveticaLight,Helvetica Neue Light,Helvetica, Arial,Lucida Grande, sans-serif'
        ],
        HelveticaRoman: ['HelveticaRoman'],
        HelveticaBold: ['helveticaBold']
      }
    }
  },
  plugins: []
};
