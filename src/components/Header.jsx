import { Fragment, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import useParking from '../hooks/useParking'
import useAuth from '../hooks/useAuth'
import MenuReserva from './MenuReserva'
import ModalPagarReserva from './ModalPagarReserva'
import ModalAnularReserva from './ModalAnularReserva'
import DigitalClock from './DigitalClock'
import SearchIcon from './svg/SearchIcon'
import MenuAlt2Icon from './svg/MenuAlt2Icon'
import BellIcon from './svg/BellIcon'
import UserIcon from './svg/UserIcon'

const Header = ({ setSidebarOpen, classNames }) => {

    const { handleOpenMenu, obtenerReservas } = useParking();
    const { cerrarSesion, auth } = useAuth();

    const userNavigation = [
        // { name: 'Your Profile', href: '#' },
        // { name: 'Settings', href: '#' },
        { name: 'Cerrar Sesion', href: '#', fn: cerrarSesion },
    ]

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex">
          {/* <DigitalClock 
              className={'text-[2rem] pointer-events-none'}
          /> */}
          {/* <form className="w-full flex md:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                onClick={() => {
                  handleOpenMenu();
                  obtenerReservas({limite: 3, orden: 'desc'})
                }}
                id="search-field"
                className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                placeholder="Search"
                type="search"
                name="search"
              />
            </div>
          </form> */}
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <div className='flex items-center gap-2'>
            <UserIcon 
              className={'w-6 h-6'}
            />
            <span>{auth.nombre.toUpperCase()} ({auth.rol})</span>
          </div>

        <DigitalClock 
              className={'text-[2rem] pointer-events-none'}
          />

            <button 
                onClick={() => {
                  handleOpenMenu();
                  obtenerReservas({limite: 3, orden: 'desc'})
                }}
               type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                <SearchIcon className="h-5 w-5" aria-hidden="true" />
            </button>

          {/* <button
            type="button"
            className="bg-white ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button> */}

          {/* Profile dropdown */}
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
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
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userNavigation.map((item) => {
                  if ( item.name === 'Cerrar Sesion' ) {
                    return <Menu.Item key={item.name}>
                      {({ active }) => (
                        <button
                          onClick={cerrarSesion}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'w-full text-start px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          {item.name}
                        </button>
                      )}
                    </Menu.Item>
                  }

                  return <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                })}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      <MenuReserva />
      <ModalPagarReserva/>
      <ModalAnularReserva />
    </div>
  )
}

export default Header