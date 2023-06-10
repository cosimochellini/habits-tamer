const componentsFolders = ['components', 'layouts', 'pages', 'app']

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: componentsFolders.map((folder) => `./${folder}/**/*.{js,ts,jsx,tsx,mdx}`),
  theme: {},
  plugins: [require('daisyui')],
}
