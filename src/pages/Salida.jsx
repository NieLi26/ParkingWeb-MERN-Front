// import { PlusIcon } from '@heroicons/react/solid'
import { useState, Fragment, useEffect } from "react";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import useParking from '../hooks/useParking'
import ParkingIcon from '../components/svg/ParkingIcon'
import LicencePlateIcon from '../components/svg/LicencePlateIcon'
import ChevronRightIcon from "../components/svg/ChevronRightIcon";
import SearchIcon from "../components/svg/SearchIcon";
import XIcon from "../components/svg/XIcon";
import { formatearFechaMenu, palabraPlural, formatearDinero } from '../helpers'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Salida() {

  const { openMenu, handleOpenMenu, obtenerReservas, reservas, reserva, handleReserva, handleModalPagarReserva, handleModalAnularReserva } = useParking();

  const [query, setQuery] = useState('')

  const filtroReserva = reservas.filter((reserva) => {
    return reserva.patente.toLowerCase().includes(query.toLowerCase())
  })

        
    useEffect(() => {
      if( query === '' ) {
        console.log('entro');
        console.log('query vacia', filtroReserva.length);
        obtenerReservas({limite: 3, orden: 'desc'})
        // .then(() => {
        //   setQuery('') 
        // })
        return;
        // handleReserva([])
        // return
      }
      console.log('query con algo');
      obtenerReservas({ q: query })
  }, [query])

  const handleSubmit = e => {
    e.preventDefault();
    console.log(reserva);
  }

  return (
    <div className="max-w-md mx-auto sm:max-w-3xl">
      <div>
        <div className="text-center">
        <LicencePlateIcon 
          className="mx-auto h-24 w-24 text-indigo-600"
        />
          {/* <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg> */}
          <h2 className="mt-2 text-lg font-medium text-gray-900">Ingrese la Patente</h2>
          <p className="mt-1 text-sm text-gray-500">You haven’t added any team members to your project yet.</p>
        </div>
        <form 
          onSubmit={handleSubmit}
          className="mt-6 sm:flex sm:items-center">
          <label htmlFor="emails" className="sr-only">
            Patente
          </label>
          <div className="relative rounded-md shadow-sm sm:min-w-0 sm:flex-1">
            <Combobox value={reserva} onChange={handleReserva}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            readOnly={reserva._id ? true : false}
                            autoComplete="off"
                            placeholder="Buscar..."
                            className="px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            displayValue={(item) => item.patente}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        { !reserva._id ? (
                              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-gray-400">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                              </svg>
                            </Combobox.Button>
                        ) : (
                          // <Combobox.Button 
                          // onClick={() => {
                          //   // console.log('feo')
                          //   handleReserva({})
                          // }}
                          // className="absolute inset-y-0 right-0 flex items-center pr-2">
                          //     <XIcon 
                          //     className="h-5 w-5 text-gray-400"
                          //   />
                          // </Combobox.Button>
                          <button 
                            onClick={() => {
                              console.log('feo')
                              handleReserva({})
                            }}
                            className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <XIcon 
                              className="h-5 w-5 text-gray-400"
                            />
                          </button>
                        )}
                     

                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-44 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">


                        {filtroReserva?.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Nothing found.
                            </div>
                        ) : (
                          <>
                            {query === '' && (
                              <h2 className="pl-2 mt-2 mb-4 text-xs font-semibold text-gray-500">Ultimas Finalizadas</h2>
                            )}

                          {filtroReserva?.map((item) => (
                            <Combobox.Option
                                key={item._id}
                                className={({ active }) =>
                                `flex gap-x-2 cursor-default select-none py-2 pl-2 pr-4 ${
                                    active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                }`
                                }
                                value={item}
                            >
                                {({ reserva, active }) => (
                                <>
                                    <LicencePlateIcon 
                                      className={"h-6 w-6 flex-none rounded-full text-indigo-600"}
                                    />
                                    <span
                                    className={`block truncate ${
                                        reserva ? 'font-medium' : 'font-normal'
                                    }`}
                                    >
                                    {item.patente}
                                    </span>
                                    
                                    {reserva ? (
                                      <span
                                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active ? 'text-white' : 'text-teal-600'
                                          }`}
                                      >
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                          </svg>

                                      </span>
                                    ) : null}
                                </>
                                )}
                            </Combobox.Option>
                            ))}
                          </>
                        )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
          </div>
          {/* <div className="mt-3 sm:mt-0 sm:ml-4 sm:flex-shrink-0">
            <button
              type="submit"
              className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Buscar
            </button>
          </div> */}
        </form>
      </div>

      { Object.keys(reserva).length !== 0 && 
        <div className="mt-6 -mb-6 flow-root border p-5 shadow-lg border-gray-200 divide-y divide-gray-200 rounded-xl bg-white">
              <div className="py-6 sm:flex">
                <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                  <ParkingIcon
                    className="flex-none w-20 h-20 rounded-md object-center object-cover sm:w-48 sm:h-48 text-indigo-600"
                  />
                  <div className="pt-1.5 min-w-0 flex-1 sm:pt-0">
                  <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
                    <dt className="col-end-1 font-semibold text-gray-900">Estacionamiento N°</dt>
                    <dd>{reserva.lote.numero}</dd>
                    {/* <dt className="col-end-1 font-semibold text-gray-900">Condicion</dt>
                    <dd>{reserva.condicion}</dd> */}
                    <dt className="col-end-1 font-semibold text-gray-900">Tarifa</dt>
                    <dd>{reserva.tarifa.nombre}</dd>
                    <dt className="col-end-1 font-semibold text-gray-900">Entrada</dt>
                    <dd>{formatearFechaMenu(reserva.entrada)}</dd>
                    <dt className="col-end-1 font-semibold text-gray-900">Salida</dt>
                    <dd>{formatearFechaMenu(reserva.salida)}</dd>
                    <dt className="col-end-1 font-semibold text-gray-900">Tiempo</dt>
                    {/* <dd>{`${reserva.tiempoTotal.dias} días, ${reserva.tiempoTotal.horas} horas y ${reserva.tiempoTotal.minutos} minutos`}</dd> */}
                    <dd>
                      {reserva.tiempoTotal.dias > 0 && `${reserva.tiempoTotal.dias} día${palabraPlural(reserva.tiempoTotal.dias)}, `}
                      {reserva.tiempoTotal.horas > 0 && `${reserva.tiempoTotal.horas} hora${palabraPlural(reserva.tiempoTotal.horas)}, `}
                      {reserva.tiempoTotal.minutos > 0 && `${reserva.tiempoTotal.minutos} minuto${palabraPlural(reserva.tiempoTotal.minutos)}`}
                    </dd>
                    <dt className="col-end-1 font-semibold text-gray-900">Total</dt>
                    <dd>{formatearDinero(reserva.precioTotal)}</dd>
                    {/* <dd className="truncate">
                      <a href={`mailto:${activeOption.email}`} className="text-indigo-600 underline">
                        {activeOption.email}
                      </a>
                    </dd> */}
                  </dl>
                  </div>
                </div>
                <div className="mt-6 space-y-4 sm:mt-0 sm:ml-6 sm:flex-none sm:w-40">
                  <button
                    onClick={() => {
                      handleModalPagarReserva()
                      handleReserva(reserva)
                    }}
                    type="button"
                    className="w-full flex items-center justify-center bg-blue-600 py-2 px-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-full sm:flex-grow-0"
                  >
                    Pagar
                  </button>
                  <button
                    onClick={() => {
                      handleModalAnularReserva()
                      handleReserva(reserva)
                    }}
                    type="button"
                    className="w-full flex items-center justify-center bg-red-600 py-2 px-2.5 border border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-full sm:flex-grow-0"
                  >
                    Anular
                  </button>
                </div>
              </div>
        </div>
      }

      {/* <div className="mt-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Recommended team members</h3>
        <ul role="list" className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          
          {people.map((person, personIdx) => (
            <li key={personIdx}>
              <button
                type="button"
                className="group p-2 w-full flex items-center justify-between rounded-full border border-gray-300 shadow-sm space-x-3 text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="min-w-0 flex-1 flex items-center space-x-3">
                  <span className="block flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
                  </span>
                  <span className="block min-w-0 flex-1">
                    <span className="block text-sm font-medium text-gray-900 truncate">{person.name}</span>
                    <span className="block text-sm font-medium text-gray-500 truncate">{person.role}</span>
                  </span>
                </span>
                <span className="flex-shrink-0 h-10 w-10 inline-flex items-center justify-center">
                  <ParkingIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  )
}
