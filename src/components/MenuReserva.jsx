import { Fragment, useEffect, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import useParking from '../hooks/useParking'
import SearchIcon from './svg/SearchIcon'
import UsersIcon from './svg/UsersIcon'
import ChevronRightIcon from './svg/ChevronRightIcon'
import LicencePlateIcon from './svg/LicencePlateIcon'
import { formatearFechaMenu, palabraPlural, formatearDinero } from '../helpers'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MenuReservas() {
    const { openMenu, handleOpenMenu, obtenerReservas, reservas, handleModalPagarReserva, handleReserva, handleModalAnularReserva } = useParking();

    const [query, setQuery] = useState('')
    // const [ recientes, setRecientes ] = useState([])

    // const filtroReserva=
    //   query === ''
    //     ? []
    //     : reservas.filter((reserva) => {
    //         return reserva.patente.toLowerCase().includes(query.toLowerCase())
    //       })
    const filtroReserva = reservas.filter((reserva) => {
      return reserva.patente.toLowerCase().includes(query.toLowerCase())
    })

    useEffect(() => {
        if( query === '' ) {
          console.log('query vacia', filtroReserva.length);
          obtenerReservas({limite: 3, orden: 'desc'})
          // .then(() => {
          //   setQuery('') 
          // })
          return;
        }
        console.log('query con algo');
        obtenerReservas({ q: query })
    }, [query])

    // useEffect(() => {
    //   if ( !modalPagarReserva ) {
    //     setQuery('') 
    //   }
    // }, [modalPagarReserva])


  return (
    <Transition.Root show={openMenu} as={Fragment} afterLeave={() => setQuery('')}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20" onClose={() => {
        // if ( !modalPagarReserva ) {
          handleOpenMenu()
        // }
      }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            onChange={(reserva) => console.log(reserva)}
          >
            {({ activeOption }) => (
              <>
                <div className="relative">
                  <SearchIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    autoComplete='off'
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {(query === '' || filtroReserva.length > 0) && (
                  <Combobox.Options as="div" static hold className="flex divide-x divide-gray-100">
                    <div
                      className={classNames(
                        'max-h-96 min-w-0 flex-auto scroll-py-4 overflow-y-auto px-6 py-4',
                        activeOption && 'sm:h-96'
                      )}
                    >
                      {query === '' && (
                        <h2 className="mt-2 mb-4 text-xs font-semibold text-gray-500">Ultimas Finalizadas</h2>
                      )}
                      
                      <div className="-mx-2 text-sm text-gray-700">
                      {/* query === '' ? recent : filteredPeople */}
                      {/* {(query === '' ? recientes : filtroReserva ).map((reserva) => ( */}
                        {(filtroReserva).map((reserva) => (
                          <Combobox.Option
                            as="div"
                            key={reserva._id}
                            value={reserva}
                            className={({ active }) =>
                              classNames(
                                'flex cursor-default select-none items-center rounded-md p-2',
                                active && 'bg-gray-100 text-gray-900'
                              )
                            }
                          >
                            {({ active }) => (
                              <>
                                
                                {/* <img src={reserva.imageUrl} alt="" className="h-6 w-6 flex-none rounded-full" /> */}
                                <LicencePlateIcon 
                                    className={"h-6 w-6 flex-none rounded-full text-indigo-600"}
                                />
                                <span className="ml-3 flex-auto truncate">{reserva.patente}</span>
                                {active && (
                                  <ChevronRightIcon
                                    className="ml-3 h-5 w-5 flex-none text-gray-400"
                                    aria-hidden="true"
                                  />
                                )}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </div>
                    </div>

                    {activeOption && (
                      <div className="hidden h-full w-1/2 flex-none flex-col divide-y divide-gray-100 overflow-y-auto sm:flex">
                        <div className="flex-none p-4 text-center">
                          {/* <img src={activeOption.imageUrl} alt="" className="mx-auto h-16 w-16 rounded-full" /> */}
                          <LicencePlateIcon 
                            className="mx-auto h-16 w-16 rounded-full text-indigo-600"
                          />
                          <h2 className="mt-3 font-semibold text-gray-900">{activeOption.patente}</h2>
                          {/* <p className="text-sm leading-6 text-gray-500">{activeOption.condicion}</p> */}
                        </div>
                        <div className="flex flex-auto flex-col justify-between p-6">
                          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                            <dt className="col-end-1 font-semibold text-gray-900">Estacionamiento N°</dt>
                            <dd>{activeOption.lote.numero}</dd>
                            {/* <dt className="col-end-1 font-semibold text-gray-900">Condicion</dt>
                            <dd>{activeOption.condicion}</dd> */}
                            <dt className="col-end-1 font-semibold text-gray-900">Tarifa</dt>
                            <dd>{activeOption.tarifa.nombre}</dd>
                            <dt className="col-end-1 font-semibold text-gray-900">Entrada</dt>
                            <dd>{formatearFechaMenu(activeOption.entrada)}</dd>
                            <dt className="col-end-1 font-semibold text-gray-900">Salida</dt>
                            <dd>{formatearFechaMenu(activeOption.salida)}</dd>
                            <dt className="col-end-1 font-semibold text-gray-900">Tiempo</dt>
                            {/* <dd>{`${activeOption.tiempoTotal.dias} días, ${activeOption.tiempoTotal.horas} horas y ${activeOption.tiempoTotal.minutos} minutos`}</dd> */}
                            <dd>
                              {activeOption.tiempoTotal.dias > 0 && `${activeOption.tiempoTotal.dias} día${palabraPlural(activeOption.tiempoTotal.dias)}, `}
                              {activeOption.tiempoTotal.horas > 0 && `${activeOption.tiempoTotal.horas} hora${palabraPlural(activeOption.tiempoTotal.horas)}, `}
                              {activeOption.tiempoTotal.minutos > 0 && `${activeOption.tiempoTotal.minutos} minuto${palabraPlural(activeOption.tiempoTotal.minutos)}`}
                              { Object.values(activeOption.tiempoTotal).every( valor => valor === 0) && '1 Minuto' }
                            </dd>
                            <dt className="col-end-1 font-semibold text-gray-900">Total</dt>
                            <dd>{formatearDinero(activeOption.precioTotal)}</dd>
                            {/* <dd className="truncate">
                              <a href={`mailto:${activeOption.email}`} className="text-indigo-600 underline">
                                {activeOption.email}
                              </a>
                            </dd> */}
                          </dl>
                          <div className='flex items-center gap-2'>
                            <button
                              onClick={() => {
                                handleModalPagarReserva()
                                handleReserva(activeOption)
                              }}
                              type="button"
                              className="mt-6 w-full rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                              Pagar
                            </button>
                            {/* <button
                              type="button"
                              className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Send message
                            </button> */}

                            <button
                              onClick={() => {
                                handleModalAnularReserva()
                                handleReserva(activeOption)
                              }}
                              type="button"
                              className="mt-6 w-full rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                              Anular
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Combobox.Options>
                )}

                {query !== '' && filtroReserva.length === 0 && (
                  <div className="py-14 px-6 text-center text-sm sm:px-14">
                    <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                    <p className="mt-4 font-semibold text-gray-900">No se Encontraron Reservas</p>
                    <p className="mt-2 text-gray-500">No pudimos encontrar nada con ese término. Inténtalo de nuevo.</p>
                  </div>
                )}
              </>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}
