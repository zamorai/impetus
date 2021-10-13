import React, { useState } from 'react';
import { RefreshIcon } from '@heroicons/react/outline';

export default function FlashCard() {
    const[front, setFront] = useState(true)
    const[frontInfo, setFrontInfo] = useState('')
    const[backInfo, setBackInfo] = useState('')

    const frontCard = () => {
        return (
        <div className="mt-24 md:mt-36">
            <input placeholder="Term" name="flash card" type="text" autoComplete='off' required className="appearance-none  text-lg block w-full px-5 py-4 border-none text-center rounded-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 "/>
        </div>
        )
    }

    const backCard = () => {
        return (
        <div className="mt-12 md:mt-24">
            <textarea rows="5" placeholder="Description" name="flash card" type="text" required className="appearance-none resize-none mt-12 block w-full px-3 py-2 border-none text-center rounded-md  placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"/>
        </div> 
        )
    }

    return (

    <div className="mt-8 mx-8 md:mx-auto md:w-full md:max-w-2xl h-96 md-card-height relative">
        <RefreshIcon onClick={() => setFront(!front)} className="-ml-1 h-5 w-5 text-black absolute right-5 top-5 cursor-pointer" aria-hidden="true" />
        <div className="bg-white py-8 px-4 shadow rounded-sm sm:px-10 h-full">
            {front ? frontCard() : backCard()}
        </div>
      </div>
    )
}
