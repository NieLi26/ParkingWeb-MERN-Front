import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import useParking from "../hooks/useParking";
// import useValidation from "../hooks/useValidation";
import validarCrearUsuario from "../validation/validarCrearUsuario";

const STATE_INICIAL = {
    nombre: '',
    email: '',
    password: '',
    password2: ''
}

const ModalFormUsuario = () => {

    const { handleModalCrearUsuario, modalFormUsuario, cargando, usuario, submitUsuario } = useParking();

    const [ id, setId ] = useState('');
    const [ form, setForm ] = useState(STATE_INICIAL)
    const [ accion, setAccion ] = useState('crear')

    useEffect(() => {
        if ( usuario?._id ) {
            setId(usuario._id)
            setForm({
                ...form,
                nombre: usuario.nombre,
                email: usuario.email
            })
            setAccion('actualizar')
            return;
        }
        setId('')
        setForm(STATE_INICIAL)
        setAccion('crear')
    }, [usuario])


    const handleSubmit = async e => {
        e.preventDefault()
        const errores = validarCrearUsuario(form, accion)
        if  ( Object.values(errores).length !== 0 ) {
            for ( let error of Object.values(errores) ) {
                toast.error(error)
            }
            return;
        }

        await submitUsuario({ ...form, id })
    }


    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }


  return (

    <Transition.Root show={ modalFormUsuario } as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalCrearUsuario}>
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
                                onClick={ handleModalCrearUsuario }
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
                                  { id ? 'Actualizar Usuario' : 'Crear Usuario' }
                                </Dialog.Title>

                            
                                <form 
                                    onSubmit={handleSubmit}
                                    className="space-y-8 divide-y divide-gray-200"
                                    noValidate
                                >
                                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 py-2">
                                        <div className="sm:col-span-6">
                                            <label
                                            htmlFor="nombre"
                                            className="block text-sm font-medium text-gray-700"
                                            >
                                            {" "}
                                            Nombre{" "}
                                            </label>
                                            
                                            <div className="mt-1">
                                            <input
                                                type="text"
                                                name="nombre"
                                                id="nombre"
                                                value={form.nombre}
                                                onChange={handleChange}
                                                className="px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700"
                                            >
                                            {" "}
                                            Correo{" "}
                                            </label>
                                            
                                            <div className="mt-1">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                className="px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            />
                                            </div>
                                        </div>
                                        { !id &&  
                                            <>
                                                <div className="sm:col-span-6">
                                                    <label
                                                    htmlFor="password"
                                                    className="block text-sm font-medium text-gray-700"
                                                    >
                                                    {" "}
                                                    Contraseña{" "}
                                                    </label>
                                                    
                                                    <div className="mt-1">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        value={form.password}
                                                        onChange={handleChange}
                                                        className="px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-6">
                                                    <label
                                                    htmlFor="password2"
                                                    className="block text-sm font-medium text-gray-700"
                                                    >
                                                    {" "}
                                                    Repetir Contraseña{" "}
                                                    </label>
                                                    
                                                    <div className="mt-1">
                                                    <input
                                                        type="password"
                                                        name="password2"
                                                        id="password2"
                                                        value={form.password2}
                                                        onChange={handleChange}
                                                        className="px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                    </div>
                                                </div>
                                            </>
                                            }
                                    </div>

                                    <div className="flex pt-5">
                                        <button
                                            type="button"
                                            onClick={handleModalCrearUsuario}
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

export default ModalFormUsuario;

