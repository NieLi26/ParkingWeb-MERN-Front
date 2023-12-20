import { Fragment, useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import useParking from "../hooks/useParking"
import XIcon from './svg/XIcon'
import EntradaIcon from './svg/EntradaIcon'
import SalidaIcon from './svg/SalidaIcon'
import LoteIcon from './svg/LoteIcon'
import TarifaIcon from './svg/TarifaIcon'
import PagoIcon from './svg/PagoIcon'
import ReservaIcon from './svg/ReservaIcon'
import UsersIcon from './svg/UsersIcon'
import DashBoardIcon from './svg/DashBoardIcon'

const Sidebar = ({ sidebarOpen, setSidebarOpen, classNames }) => {

    const { handlePagina } = useParking()

    const location = useLocation()

    const [ navigation, setNavigation ] = useState([
      { name: 'Entrada', href: '/entrada', icon: EntradaIcon, current: true },
      { name: 'Salida', href: '/salida', icon: SalidaIcon, current: false },
      // { name: 'Lotes', href: '/lotes', icon: LoteIcon, current: false },
      { name: 'Tarifas', href: '/tarifas', icon: TarifaIcon, current: false },
      { name: 'Pagos', href: '/pagos', icon: PagoIcon, current: false },
      { name: 'Reservas', href: '/reservas', icon: ReservaIcon, current: false },
      { name: 'Usuarios', href: '/usuarios', icon: UsersIcon, current: false },
      { name: 'Dashboard', href: '/dashboard', icon: DashBoardIcon, current: false },
  ])

    useEffect(() => {
        const newNavigation = navigation.map( nav => ({...nav, current: nav.href === location.pathname}))
        setNavigation(newNavigation)
    }, [location.pathname])

  return (
    <>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <Link
                    to={'/'}
                  >
                    <img
                      className="h-12 w-auto rounded-xl"
                      src="logo.ico"
                      alt="logo Parking Web"
                    />
                    {/* <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                      alt="Workflow"
                    /> */}
                  </Link>
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-4 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow border-r border-gray-200 pt-2 bg-white overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              {/* <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                alt="Workflow"
              /> */}
              <Link
                to={'/'}
              >
                <img
                  className="h-12 w-auto rounded-xl"
                  src="logo.ico"
                  alt="logo Parking Web"
                />
              </Link>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    onClick={() => handlePagina(1)}
                    to={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
    </>
  )
}

export default Sidebar