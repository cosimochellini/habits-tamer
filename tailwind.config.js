const componentsFolders = ['components', 'layouts', 'pages', 'app', 'features']

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: componentsFolders.map((folder) => `./${folder}/**/*.{js,ts,jsx,tsx,mdx}`),
  theme: {},
  // eslint-disable-next-line import/no-extraneous-dependencies,global-require
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: true,
    logging: false,
  },
}
