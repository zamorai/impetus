import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { Menu, Popover, Transition, Dialog } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { MenuIcon, XIcon, CollectionIcon } from '@heroicons/react/outline'
import { doc, setDoc } from 'firebase/firestore';
import { signInWithPopup, signOut } from '@firebase/auth'
import { googleProvider, auth, firestore } from '../lib/firebase'
import { UserContext } from '../lib/context'
import Link from 'next/link'
import { kebabCase } from 'lodash';
import { uuid } from 'uuidv4'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  let [isOpen, setIsOpen] = useState(false)
  const user = useContext(UserContext)

  const signInWithGoogle = async () => {
      await signInWithPopup(auth, googleProvider)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
      async function updateFirebase() {
          if(user) {
              const userDoc = doc(firestore, `users/${user.uid}`)
              await setDoc(userDoc, {username: user.displayName, photoUrl: user.photoURL, email: user.email, uid: user.uid}, {merge: true})
          }
      }
      updateFirebase()
      
  }, [user])

  const addCollection = async (name) => {
    const url = encodeURI(kebabCase(name));
    const id = uuid()
    const collectionRef = doc(firestore, `users/${user.uid}/collections/${id}`)
    await setDoc(collectionRef, {name: name, cards: 0, url:url, id:id}, {merge: true})
  }

return (
  <div className="border-b border-gray-200">
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
      as="header"
      className={({ open }) =>
          classNames(
          open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
          'bg-white shadow-sm lg:static lg:overflow-y-visible'
          )
      }
      >
      {({ open }) => (
          <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8 ">
                  <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2 ">
                      <div className="flex-shrink-0 flex items-center">
                          <Link href="/" >
                          <a>
                              <img className="h-8 w-auto" src={'/logo-big.png'} alt="Workflow" />
                          </a>
                          </Link>
                      </div>
                  </div>
                  <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                      <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                      <div className="w-full">
                          <label htmlFor="search" className="sr-only"> Search </label>
                          <div className="relative">
                              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                  <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                              </div>
                              <input
                                  id="search"
                                  name="search"
                                  className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-indigo-500 sm:text-sm"
                                  placeholder="Search"
                                  type="search"
                              />
                          </div>
                      </div>
                      </div>
                  </div>
                  <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                      {/* Mobile menu button */}
                      <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500">
                      <span className="sr-only">Open menu</span>
                      {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                          <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                      </Popover.Button>
                  </div>
                  <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                      {/* Profile dropdown */}
                      {user && 
                      <Menu as="div" className="flex-shrink-0 relative ml-5">
                      <div>
                          <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src={user.photoURL} alt="" />
                          </Menu.Button>
                      </div>
                      <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                      >
                          <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                              <>
                                  <Menu.Item>
                                      {({ active }) => (
                                          <Link href={`/${user.uid}`} >
                                          <a className={classNames(
                                              active ? 'bg-gray-100' : '',
                                              'block py-2 px-4 text-sm text-gray-700'
                                          )}
                                          >
                                          All Collections
                                          </a>
                                          </Link>
                                      )}
                                  </Menu.Item>
                                  <Menu.Item>
                                      {({ active }) => (
                                          <a onClick={() => signOut(auth)} href='#' className={classNames(
                                              active ? 'bg-gray-100' : '',
                                              'block py-2 px-4 text-sm text-gray-700'
                                          )}
                                          >
                                          Sign Out
                                          </a>
                                      )}
                                  </Menu.Item>
                              </>
                          </Menu.Items>
                      </Transition>
                      </Menu> 
                      }
                      {user ? 
                      <a
                      onClick={openModal}
                      href="#"
                      className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                      >
                      New Collection
                      <CreateCollection isOpen={isOpen} setIsOpen={setIsOpen} addCollection={addCollection}/>
                      </a> :
                      <a
                      onClick={signInWithGoogle}
                      href="#"
                      className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                      >
                      Sign In
                      </a>
                      }
                  </div>
              </div>
          </div>

          {/* This is the mobile menu */}
          <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className={`border-t border-b border-gray-200 ${user ? 'pt-4' : ''} pb-3`}>
                  {user ? (
                      <>
                      <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                          <div className="flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" src={user.photoURL} alt="" />
                          </div>
                          <div className="ml-3">
                          <div className="text-base font-medium text-gray-800">{user.name}</div>
                          <div className="text-sm font-medium text-gray-500">{user.email}</div>
                          </div>
                      </div>
                      <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                          <a
                              onClick={openModal}
                              href='#'
                              className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                          >
                              New Collection
                          </a>
                          <Link href={`/${user.uid}`}>
                          <a
                              className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                          >
                              All Collections
                          </a>
                          </Link>
                          <a
                              onClick={() => signOut(auth)}
                              href='#'
                              className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                          >
                              Sign Out
                          </a>
                      </div>
                      </>
                  ):
                  <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                  <a
                      onClick={signInWithGoogle}
                      href='#'
                      className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  >
                      Sign In
                  </a> 
              </div>
              }
              </div>
          </Popover.Panel>
          </>
      )}
          </Popover> 
  </div>
  )
}


function CreateCollection(props) {
  const[collectionName, setCollectionName] = useState('');
  const cancelButtonRef = useRef(null)

  const onCollectionCreate = () => {
    props.addCollection(collectionName)
    setCollectionName("") 
    props.setIsOpen(false)
  }

  return (
    <Transition.Root show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={props.setIsOpen}>
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
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CollectionIcon className="h-6 w-6 text-emerald-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    New Collection
                  </Dialog.Title>
                  <div className="mt-2">
                    <label htmlFor="text" className="sr-only">
                            Collection
                    </label>
                    <input
                        onChange={(e) => setCollectionName(e.target.value)}
                        value={collectionName}
                        type="text"
                        name="collection"
                        className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Collection"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none sm:col-start-2 sm:text-sm"
                  onClick={onCollectionCreate}
                >
                  Create
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => props.setIsOpen(false)}
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
