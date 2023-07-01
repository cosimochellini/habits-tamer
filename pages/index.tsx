import Head from 'next/head'

import { OverviewPage } from '@/features/overview/OverviewPage/OverviewPage'

const IndexPage = () => (
  <div>
    <Head>
      <title>Habits tamer - track and monitor your habits</title>
    </Head>
    <OverviewPage />
  </div>
)

export default IndexPage
