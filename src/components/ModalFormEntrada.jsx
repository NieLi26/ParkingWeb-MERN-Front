import { Fragment, useState, useEffect } from "react";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import useParking from "../hooks/useParking";
import DigitalClock from "./DigitalClock";
import validarCrearReserva from "../validation/validarCrearReserva";
import { formatearFecha } from "../helpers/formatearFecha";

const STATE_INICIAL = {
    patente: '',
    tarifa: ''
}

const ModalFormEntrada = () => {
    const { handleModalCrearReserva, modalFormReserva, cargando, reserva, submitReserva, tarifas, tarifa, handleTarifa, lote } = useParking();

    const [ id, setId ] = useState('');
    const [ form, setForm ] = useState(STATE_INICIAL)

    useEffect(() => {
        console.log('SE USO');
        if ( reserva?._id ) {
            setId(reserva._id)
            setForm({
                ...form,
                patente: reserva.patente,
                tarifa: reserva.tarifa
            })
            return;
        }
        setId('')
        setForm(STATE_INICIAL)
        handleTarifa({})
    }, [lote])

    const handleSubmit = async e => {
        e.preventDefault()
        const errores = validarCrearReserva(form)
        if  ( Object.values(errores).length !== 0 ) {
            for ( let error of Object.values(errores) ) {
                toast.error(error)
            }
            return;
        }

        await submitReserva({ ...form, id })
    }

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // Combobox
    const [queryTarifa, setQueryTarifa] = useState('');
    const filteredTarifas =
        queryTarifa === ''
        ? tarifas
        : tarifas?.filter((tarifa) =>
            tarifa.nombre
            .toString().startsWith(queryTarifa)
        )
    
    useEffect(() => {
        if ( tarifa._id ) {
            console.log(tarifa);
            setForm({
                ...form,
                tarifa: tarifa._id
            })
            return
        }
        setForm({
            ...form,
            tarifa: ''
        })
    }, [tarifa])

  return (

    <Transition.Root show={ modalFormReserva } as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalCrearReserva}>
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
                    <Dialog.Overlay 
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                    />
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


                        <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                            <button
                                type="button"
                                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={ handleModalCrearReserva }
                            >
                            <span className="sr-only">Cerrar</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>


                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                  { id ? 'Actualizar Reserva' : 'Crear Reserva' }
                                </Dialog.Title>

                                <p className="text-center text-sm md:text-xl font-bold mt-2 text-lime-500">{ formatearFecha(Date.now()) }</p>
                                <DigitalClock 
                                    className={'text-[2rem] md:text-[4rem] rounded bg-yellow-100 mt-2'}
                                />

                                {/* <div className="bg-indigo-600 p-4 rounded-md text-white mt-5 text-start">
                                    <h2 className="mb-2">Costo de Estacionamiento por Minuto:</h2>
                                    { tarifas.map( tarifa => 
                                        <p key={tarifa._id}>{tarifa.nombre}: <strong>${tarifa.precioMinuto}</strong></p> 
                                    )}
                                </div> */}

                            
                                <form 
                                    onSubmit={handleSubmit}
                                    className="space-y-8 divide-y divide-gray-200"
                                    noValidate
                                >
                                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 py-2">
                                        <div className="sm:col-span-6">
                                            <label
                                                htmlFor="fecha-nacimiento"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Tarifa
                                            </label>

                                            <Combobox value={tarifa} onChange={handleTarifa}>
                                                <div className="relative mt-1">
                                                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                                        <Combobox.Input
                                                            className="px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                            displayValue={(item) => item.nombre}
                                                            onChange={(event) => setQueryTarifa(event.target.value)}
                                                        />
                                                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-gray-400">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                                            </svg>
                                                        </Combobox.Button>
                                                    </div>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                        afterLeave={() => setQueryTarifa('')}
                                                    >
                                                        <Combobox.Options className="absolute mt-1 max-h-28 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {filteredTarifas?.length === 0 && queryTarifa !== '' ? (
                                                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                            Nothing found.
                                                            </div>
                                                        ) : (
                                                            filteredTarifas?.map((item) => (
                                                            <Combobox.Option
                                                                key={item._id}
                                                                className={({ active }) =>
                                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                    active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                                }`
                                                                }
                                                                value={item}
                                                            >
                                                                {({ tarifa, active }) => (
                                                                <>
                                                                    <span
                                                                    className={`block truncate ${
                                                                        tarifa ? 'font-medium' : 'font-normal'
                                                                    }`}
                                                                    >
                                                                    {item.nombre} - $({item.precioMinuto})
                                                                    </span>
                                                                    
                                                                    {tarifa ? (
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
                                                            ))
                                                        )}
                                                        </Combobox.Options>
                                                    </Transition>
                                                </div>
                                            </Combobox>
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label
                                            htmlFor="patente"
                                            className="block text-sm font-medium text-gray-700"
                                            >
                                            {" "}
                                            Patente{" "}
                                            </label>
                                            
                                            <div className="mt-1">
                                            <input
                                                type="text"
                                                name="patente"
                                                id="patente"
                                                value={form.patente}
                                                onChange={handleChange}
                                                className="px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex pt-5">
                                        <button
                                            type="button"
                                            onClick={handleModalCrearReserva}
                                            className="w-full bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={cargando && true}
                                            className="disabled:opacity-50 disabled:bg-green-600 disabled:cursor-not-allowed w-full ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            { cargando ? <Spinner /> : <span>Guardar</span> }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>

  );
};

export default ModalFormEntrada;

