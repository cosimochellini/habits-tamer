import { useSession } from 'next-auth/react'

const IndexPage = () => {
  const { data: session } = useSession()

  return (
    <div className='h-screen flex flex-col gap-2 justify-center w-full'>
      <h1>Hello World</h1>
      <p> This is the index page</p>
      {JSON.stringify(session)}
      <button className='btn' type='button'>
        daisy button
      </button>
    </div>
  )
}

export default IndexPage
