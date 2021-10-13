import React from 'react'
import FlashCard from '../../../components/FlashCard'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import Link from 'next/link'

const steps = [
    { name: 'Microbiome', href: '#', status: 'current' },
    {
      name: 'Anthropomorphe',
      href: '#',
      status: 'learned',
    },
    { name: 'World war', href: '#', status: 'current' },
    { name: 'Supercalifragilisticexpiralidocious', href: '#', status: 'upcoming' },
    { name: 'Tonape Bay', href: '#', status: 'upcoming' },
    { name: 'Tonape Bay', href: '#', status: 'upcoming' },
    { name: 'Tonape Bay', href: '#', status: 'upcoming' },
  ]
  
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Study() {

    const cardList = steps.map((step, stepIdx) => {
        return (
            <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pb-5' : '', 'relative')}>
                {step.status === "learned" ? (
                    <>
                    <a href={step.href} className="flex flex-col md:flex-row items-center relative group">
                        <span className="h-9 flex items-center">
                            <span className="relative z-10 w-7 h-7 flex items-center justify-center bg-emerald-600 rounded-full group-hover:bg-emerald-800">
                            <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
                            </span>
                        </span>
                        <span className="ml-4 min-w-0 flex flex-col">
                            <span className="text-xs font-semibold tracking-wide uppercase truncate">{step.name}</span>
                        </span>
                    </a>
                    </>
                ) : step.status === "current" ? (
                    <>
                    <a href={step.href} className="flex flex-col md:flex-row items-center relative group" aria-current="step">
                        <span className="h-9 flex items-center" aria-hidden="true">
                            <span className="relative z-10 w-7 h-7 flex items-center justify-center bg-white border-2 border-emerald-600 rounded-full">
                            <span className="h-2.5 w-2.5 bg-emerald-600 rounded-full" />
                            </span>
                        </span>
                        <span className="ml-4 min-w-0 flex flex-col">
                            <span className="text-xs font-semibold tracking-wide uppercase text-emerald-600 truncate">{step.name}</span>
                        </span>
                    </a>
                    </>
                ) : (
                    <>
                    <a href={step.href} className="flex flex-col md:flex-row items-center relative group">
                        <span className="h-9 flex items-center" aria-hidden="true">
                            <span className="relative z-10 w-7 h-7 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                            <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                            </span>
                        </span>
                        <span className="ml-4 min-w-0 flex flex-col">
                            <span className="text-xs font-semibold tracking-wide uppercase text-gray-500 truncate">{step.name}</span>
                        </span>
                    </a>
                    </>
                )}
            </li>
        )
    })

    return (
        <div className="grid grid-cols-12">
        <aside className="col-span-full md:col-span-2 md:row-span-full 2xl:col-span-1">
            <div className="md-true-height bg-gray-50 overflow-hidden relative">
                <ChevronUpIcon className="h-5 w-5 absolute top-2 left-1/2 text-emerald-500 invisible md:visible" />
                <ChevronLeftIcon className="h-5 w-5 absolute top-10 left-0 text-emerald-500 md:invisible" />
                <ol role="list" className="px-4 py-4 md:py-8 flex md:flex-col w-full h-full overflow-y-scroll no-scrollbar">
                    {cardList}
                </ol>
                <ChevronDownIcon className="h-5 w-5 absolute bottom-2 left-1/2 text-emerald-500 invisible md:visible" />
                <ChevronRightIcon className="h-5 w-5 absolute top-10 right-0 text-emerald-500 md:invisible" />
            </div> 
        </aside>
        <main className="col-span-full md:col-start-3 md:col-end-13 2xl:col-start-2 2xl:col-end-13">
            <div className="divide-y divide-gray-100">
                <FlashCard />
            </div>
            <div className="fixed bottom-0 left-1/2 mb-24">
                
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
                <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <ChevronLeftIcon className="h-5 w-5 text-emerald-500" />
                </button>
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border-t border-b border-emerald-500 text-sm font-medium text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none"
                >
                    Learned
                </button>
                <button
                    type="button"
                    className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <ChevronRightIcon className="h-5 w-5 text-emerald-500" />
                </button>
            </span>
            </div>
        </main>
    </div>
    )
}
