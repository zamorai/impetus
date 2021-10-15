import { collection, query, onSnapshot, doc, deleteDoc } from '@firebase/firestore';
import { firestore } from '../../../lib/firebase';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react'
import { useContext, useEffect, useState, useRef, Fragment } from 'react';
import { UserContext } from '../../../lib/context';
import { ExclamationIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'


const collectionss = [{
  cards: 12,
  name: 'Mathematical Agenda'
}, {
  cards: 234,
  name: "Escanor"
}]

export default function User() {
  const user = useContext(UserContext)
  const[collections, setCollections] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if(user) {
      const collectionQuery = query(collection(firestore, `users/${router.query.user}/collections`))
      var unsubscribe = onSnapshot(collectionQuery, (querySnapshot) => {
        const cols = [];
        querySnapshot.forEach((doc) => {
          cols.push(doc.data())
        })
        setCollections(cols)
      })
    }
    console.log(collections)
    return unsubscribe
  }, [user])

  return (
    <>
      <div className="flex items-center grid-bg h-28 md:h-32 lg:h-36">
        <div className="relative max-w-7xl py-12 mx-auto flex justify-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-light tracking-tight text-white sm:text-5xl lg:text-6xl">All Collections</h1>
        </div>
      </div>
      <Collections collections={collections}/>
    </>
  )
}

function Collections(props) {

  return (
    <div className="w-full">
      <div className="w-full h-24 divide-y divide-gray-200">
        {collectionss.map((collection) => (
          <div className="h-full text-gray-600 w-full hover:bg-gray-200">
            <div className="w-full h-full max-w-7xl mx-auto flex items-center justify-between flex-wrap">

              <div className="flex items-center justify-center w-12 ml-4 bg-blue-200">
                <div className="flex-shrink-0">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {collection.cards}
                  </span>
                </div>
              </div>

              <div className="ml-4 bg-red-200 w-24 sm:w-28 md:w-32 lg:w-48 text-center">
                <Link href={''} >
                  <div className="text-sm font-medium text-indigo-600 cursor-pointer">{collection.name}</div>
                </Link>
              </div>

              <div className="flex items-center justify-between bg-green-300 w-12">
                <a href="#" className="text-emerald-600 hover:text-emerald-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </a>
                <a onClick={() => setOpen(true)} className="text-red-600 hover:text-red-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </a>
              </div>

              <div className="bg-yellow-300 flex self-stretch w-52 justify-around items-center">
                <div className=""> study </div>
                <div className="border-l border-r px-4 border-emerald-400"> timed </div>
                <div className=''> quiz </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

//<CollectionList collections={collections} user={user}/>
function CollectionList(props) {
  const[open, setOpen] = useState(false)

  const deleteCollection = async (id) => {
    await deleteDoc(doc(firestore, `users/${props.user.uid}/collections/${id}`))
  }

  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-hidden">
      <div className="-my-2 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="w-full max-w-7xl mx-auto">
              <tbody className="bg-white divide-y divide-gray-200">
                {props.collections.map((collection) => (
                  <tr className="hover:bg-gray-50" key={collection.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {collection.cards}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="ml-4">
                        <Link href={`${props.user.uid}/${collection.id}`} >
                          <div className="text-sm font-medium text-indigo-600 cursor-pointer">{collection.name}</div>
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button
                        type="button"
                        className="inline-flex items-center mr-6 px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-emerald-600 hover:text-white focus:outline-none"
                        >
                          Study
                        </button>
                        
                        <div className="border-l border-r border-0 px-6 border-gray-300">
                          <button
                          type="button"
                          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-emerald-600 hover:text-white focus:outline-none"
                          >
                            Timed
                          </button>
                        </div>
                        <button
                        type="button"
                        className="inline-flex items-center ml-6 px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-emerald-600 hover:text-white focus:outline-none"
                        >
                          Quiz
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-evenly">
                        <a href="#" className="text-emerald-600 hover:text-emerald-900">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </a>
                        <a onClick={() => setOpen(true)} className="text-red-600 hover:text-red-900">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </a>
                      </div>
                    </td>
                    <CancelModal open={open} setOpen={setOpen} deleteCollection={deleteCollection} id={collection.id} name={collection.name} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function CancelModal(props) {
  const cancelButtonRef = useRef(null)

  const onDeleteClick = () => {
    props.deleteCollection(props.id)
    props.setOpen(false)
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={props.setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Delete Collection
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete {props.name}? This item will delete immedietly. You cannot undo this action. You are frucked. 
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onDeleteClick}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => props.setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}