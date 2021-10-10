import React, { useState } from 'react'

export default function FlashCard() {
    const[side, setSide] = useState('front')
    const[frontInfo, setFrontInfo] = useState('')
    const[backInfo, setBackInfo] = useState('')

    return (
        <div className="w-52 h-52 bg-white">
            This is a flashcard
        </div>
    )
}
