import Head from 'next/head'
import FlashCard from '../components/FlashCard'

export default function Home() {
  return (
    <div className="flex flex-col true-height bg-white-900">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Flashcards to enrich your</span>{' '}
              <span className="block text-emerald-600 xl:inline">study experience</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Start creating your own flashcards to ace your next exam
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:py-4 md:text-lg md:px-10"
                >
                  Get started
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-emerald-600 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
                >
                  Live demo
                </a>
              </div>
            </div>
          </div>
        </main>

        <div className="bg-indigo-800 mt-24">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Trusted by students from over 800 universities</h2>
              <p className="mt-3 text-xl text-indigo-200 sm:mt-4">
                'It honestly made my exam 100 times easier, I'll thank Impetus on my graduation speech'
              </p>
            </div>
            <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
              <div className="flex flex-col">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">Cards</dt>
                <dd className="order-1 text-5xl font-extrabold text-white">4689</dd>
              </div>
              <div className="flex flex-col mt-10 sm:mt-0">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">Students</dt>
                <dd className="order-1 text-5xl font-extrabold text-white">265</dd>
              </div>
              <div className="flex flex-col mt-10 sm:mt-0">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">Collections</dt>
                <dd className="order-1 text-5xl font-extrabold text-white">1100</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <p className="text-center text-base font-semibold uppercase text-gray-600 tracking-wider">
              Some of our most trusted supporters
            </p>
            <div className="mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8">
              <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                <img
                  className="max-h-12"
                  src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
                  alt="Workcation"
                />
              </div>
              <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                <img className="max-h-12" src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg" alt="Mirage" />
              </div>
              <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                <img className="max-h-12" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg" alt="Tuple" />
              </div>
              <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                <img className="max-h-12" src="https://tailwindui.com/img/logos/laravel-logo-gray-400.svg" alt="Laravel" />
              </div>
              <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                <img
                  className="max-h-12"
                  src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                  alt="StaticKit"
                />
              </div>
              <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                <img
                  className="max-h-12"
                  src="https://tailwindui.com/img/logos/statamic-logo-gray-400.svg"
                  alt="Statamic"
                />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
