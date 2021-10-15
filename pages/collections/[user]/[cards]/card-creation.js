import React, { useState } from 'react'
import { PlusCircleIcon, CheckIcon, TrashIcon } from '@heroicons/react/solid'
import FlashCard from '../../../components/FlashCard';
import { getDoc, doc, collection } from '@firebase/firestore';
import { firestore } from '../../../lib/firebase';

export default function Card(props) {
    const[frontInfo, setFrontInfo] = useState('props.cardInfo.frontInfo')
    const[backInfo, setBackInfo] = useState('props.cardInfo.backInfo');
    
    const updateCard = () => {

    }

    const clearCard = () => {
        setFrontInfo('')
        setBackInfo('') 
    }

    return (
        <div className="true-height bg-gray-50">
            <div className="w-ful max-w-7xl mx-auto true-height">
                <div className="flex flex-col">
                    <div className="mt-8 text-center">
                        <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            Collection name cards
                        </button>
                    </div>
                    <div>
                        <FlashCard frontInfo={frontInfo} backInfo={backInfo} />
                    </div>
                    <div className="text-center mt-8">
                        <span className="relative z-0 inline-flex shadow-sm rounded-md">
                            <button
                                type="button"
                                className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-green-500 text-sm font-medium text-white hover:bg-green-600 focus:z-10 focus:outline-none"
                            >
                                <CheckIcon className="-ml-1 mr-2 h-5 w-5 text-white" aria-hidden="true" />
                                Add Card
                            </button>
                            <button
                                type="button"
                                className="-ml-px relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-red-500 text-sm font-medium hover:bg-red-600 focus:z-10 focus:outline-none"
                            >
                                <TrashIcon onClick={clearCard} className="-ml-1 h-5 w-5 text-white" aria-hidden="true" />
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

