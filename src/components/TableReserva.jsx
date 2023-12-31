import { useState } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import useParking from "../hooks/useParking"
import useAuth from "../hooks/useAuth"
import Paginacion from "./Paginacion"
import { formatearFechaMenu } from "../helpers"
import EntradaTicket from "./EntradaTicket"
import RevertirIcon from "./svg/RevertirIcon"
import PrintIcon from "./svg/PrintIcon"
import PreviewIcon from './svg/PreviewIcon';

const ROLES_MAESTROS = ['ADMIN_ROLE', 'SUPER_ROLE']

const headTable = ['Lote', 'Entrada', 'Salida', 'Estado']

const COLOR_CONDICION = {
    'Iniciada': 'text-green-600 border border-green-600 bg-green-200',
    'Finalizada': 'text-red-600 border border-red-600 bg-red-200',
    'Pagada': 'text-blue-600 border border-blue-600 bg-blue-200',
    'Anulada': 'text-yellow-600 border border-yellow-600 bg-yellow-200',
}

export default function TableReserva() {

    // const [ previewPDF, setPreviewPDF ] = useState(false)
    const { auth } = useAuth()
    const { reservasPaginadas, handleModalCorregirAnulacionReserva, handleReserva, handleModalPreview } = useParking()
    
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Reservas</h1>
            <p className="mt-2 text-sm text-gray-700">
            Ver, Crea, Editar y Eliminar Tus Reservas.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            {/* <button
              onClick={handleModalCrearTarifa}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Agregar
            </button> */}
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                        <th
                           className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                        >
                            Patente
                        </th>

                        { headTable.map( (head, i) => (
                            <th
                                key={i}
                                scope="col"
                                className="pl-3 py-4 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                            >
                                { head }
                            </th>
                        ))}
            
                     
                      <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {reservasPaginadas.map((reserva) => (
                      <tr key={reserva._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {reserva.patente}
                        </td>
                        
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reserva.lote.numero}</td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reserva.entrada ? formatearFechaMenu(reserva.entrada) : 'Sin Registro'}</td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{reserva.salida ? formatearFechaMenu(reserva.salida) : 'Sin Registro'}</td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className={`px-2 py-1 rounded-full ${COLOR_CONDICION[reserva.condicion]}`}>{reserva.condicion}</span>
                        </td>

                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          
                          { (reserva.condicion === 'Anulada' && ROLES_MAESTROS.includes(auth.rol)) && 
                            <button 
                              onClick={() => handleModalCorregirAnulacionReserva(reserva)}
                              className="text-yellow-600 hover:text-yellow-900 mr-2"
                            >
                                <RevertirIcon 
                                  className={"w-6 h-6"}
                                />
                                <span className="sr-only">Corregir</span>
                            </button>
                          }

                            <button 
                              onClick={() => {
                                handleModalPreview()
                                handleReserva(reserva)
                              }}
                              className="text-blue-600 hover:text-blue-900 mr-2"
                            >
                                <PreviewIcon 
                                  className={"w-6 h-6"}
                                />
                                <span className="sr-only">Print</span>
                            </button>

                            <PDFDownloadLink
                              document={<EntradaTicket reserva={reserva} />}
                              fileName="entrada-ticket.pdf"
                            >
                              <button 
                                onClick={() => handleReserva(reserva)}
                                className="text-green-600 hover:text-green-900 mr-2"
                              >
                                  <PrintIcon 
                                    className={"w-6 h-6"}
                                  />
                                  <span className="sr-only">Download Ticket</span>
                              </button>
                            </PDFDownloadLink>
                          {/* <button 
                              onClick={() => handleModalEditarTarifa(tarifa)}
                              className="text-yellow-600 hover:text-yellow-900 mr-2"
                              >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                              </svg>
                              <span className="sr-only">Editar</span>
                          </button>

                          <button 
                            onClick={() => handleModalEliminarPago(reserva)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            <span className="sr-only">Eliminar</span>
                          </button> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Paginacion />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
