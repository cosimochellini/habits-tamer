import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => (
  <Html>
    <Head>
      <meta name='description' content='Habits tamer - track and monitor your habits' key='desc' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/icon.png' />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
