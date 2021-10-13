import Head from 'next/head'
import FlashCard from '../components/FlashCard'

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-blue-300">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
