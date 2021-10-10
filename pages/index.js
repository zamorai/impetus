import Head from 'next/head'
import FlashCard from '../components/FlashCard'


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen py-2 bg-red-400">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FlashCard/>
    </div>
  )
}
