import React, { useContext } from 'react'
import {
    BookOpenIcon,
    ClockIcon,
    AcademicCapIcon,
    PlusSmIcon
  } from '@heroicons/react/outline';
import Link from 'next/link';
import { collection, getDocs, getDoc, doc, setDoc, deleteDoc } from '@firebase/firestore';
import { firestore } from '../../../lib/firebase';
import { UserContext } from '../../../lib/context';

const navigation = [
    { name: 'Study', href: '/user/collection/study', icon: BookOpenIcon, current: true },
    { name: 'Timed', href: '#', icon: ClockIcon, current: false },
    { name: 'Quiz', href: '#', icon: AcademicCapIcon, current: false },
]

export async function getServerSideProps({ params }) {
    const userId = params.user;
    const collectionName = params.collections

    const collectionQuery = await getDocs(collection(firestore, `users/${userId}/collections/${collectionName}/cards`))
    const collectionCards = []
    collectionQuery.forEach((doc) => {
        collectionCards.push(doc.data())
    })

    const titleRef = doc(firestore, `users/${userId}/collections/${collectionName}`)
    const titleSnap = await getDoc(titleRef)

    return {
        props: { collectionCards, title: titleSnap.data().name, collectionName, uid:userId }
    }    
}

export default function Collection({collectionCards, title, collectionName, uid}) {
    const user = useContext(UserContext)
    const cardName = `card-${Math.floor(Math.random()*1000)}`

    const addCard = async () => {
        await setDoc(doc(firestore, `users/${user.uid}/collections/${collectionName}/cards/${cardName}`), {
            name: cardName,
            frontInfo: "test",
            backInfo: "test"
        })
    }

    const deleteCard = async(name) => {
        await deleteDoc(doc(firestore, `users/${user.uid}/collections/${collectionName}/cards/${name}`))
        window.location.reload(false)
    }

    const singleCollection = collectionCards.map(card => {
        return (
            <div className="flex bg-white items-center justify-between py-6 px-4 sm:px-6 shadow-sm w-full hover:bg-gray-50">
                <div className="flex flex-col min-w-0 divide-y divide-gray-200">
                    <p className="text-medium font-sm">{card.frontInfo}</p>
                    <p className="text-sm font-medium text-emerald-600 truncate ">{card.backInfo}</p>
                </div>
                <div className="flex items-center justify-evenly w-24">
                    <a href="#" className="text-emerald-600 hover:text-emerald-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </a>
                    <a onClick={() => deleteCard(card.name)} href="#" className="text-red-600 hover:text-red-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </a>
                </div>
            </div>
        )
    })

    return (
        <div className="grid grid-cols-12">
            <aside className="col-span-full md:col-span-2 md:row-span-full 2xl:col-span-1">
                <div className="flex flex-col flex-1 bg-emerald-700 md:pt-5 md-true-height">
                    <nav className="flex justify-around py-2 px-2 md:py-0 space-y-1 md:inline">
                        {navigation.map((item) => (
                        <Link href={item.href}>
                            <a
                                key={item.name}
                                href={item.href}
                                className='active:bg-emerald-800 active:text-white text-emerald-100 hover:bg-emerald-600 group flex items-center px-2 py-2 text-base font-medium rounded-md'   
                            >
                                <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-emerald-300" aria-hidden="true" />
                                {item.name}
                            </a>
                        </Link>
                        ))}
                    </nav> 
                </div>
            </aside>
            <main className="col-span-full md:col-start-3 md:col-end-13 2xl:col-start-2 2xl:col-end-13">
                <div className="bg-white px-4 pt-5 sm:px-6 shadow-sm">
                    <h3 className="text-lg leading-6 font-medium text-emerald-900">{title}</h3>
                    <div className="relative mt-2">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-2 bg-white text-sm text-gray-500">Cards</span>
                        </div>
                    </div>
                </div>
                <div className="divide-y divide-gray-100 block md-med-height overflow-y-auto">
                    {singleCollection}
                </div>
                <div className="fixed bottom-0 left-1/2 mb-8">
                    <Link href={`/${uid}/${collectionName}/card-creation`}>
                        <button
                        onClick={addCard}
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Add Card
                            <PlusSmIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
                        </button>
                    </Link>
                </div>
            </main>
        </div>
    )
}

