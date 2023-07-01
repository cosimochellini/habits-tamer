import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => (
  <Html>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/icon.png' />
      <meta charSet='UTF-8' />
      <meta
        name='description'
        content='Task Tamer is a powerful PWA app to track your habits, set goals, and monitor your progress. Stay organized and accomplish more.'
      />
      <meta
        name='keywords'
        content='task tamer, habit tracker, habit monitoring, productivity app, goal tracking'
      />
      <meta name='robots' content='index,follow' />
      <meta property='og:title' content='Task Tamer - Track and Manage Your Habits' />
      <meta
        property='og:description'
        content='Task Tamer is a powerful PWA app to track your habits, set goals, and monitor your progress. Stay organized and accomplish more.'
      />

      <meta name='twitter:title' content='Task Tamer - Track and Manage Your Habits' />
      <meta
        name='twitter:description'
        content='Task Tamer is a powerful PWA app to track your habits, set goals, and monitor your progress. Stay organized and accomplish more.'
      />
      <link rel='prefetch' href='/api/habits?' as='fetch' />
      <link rel='manifest' href='/manifest.json' />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
