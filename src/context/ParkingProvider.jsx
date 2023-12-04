import { createContext, useState } from "react";
import { toast } from "react-toastify";
import clienteAxios from "../config/clienteAxios";

const ParkingContext = createContext();

const ParkingProvider = ({ children }) => {

    const [ paginator, setPaginator ] = useState({});
    const [ pagina, setPagina ] = useState(1);
    const [ cargando, setCargando ] = useState(false);
    // const [ mostrarPaginacion, setMostrarPaginacion ] = useState([])

    const handlePaginator = paginator => {
        setPaginator(paginator)
    }

    const handlePagina = pagina => {
        setPagina(pagina)
    }
    

    const [ openMenu, setOpenMenu ] = useState(false)
    const [ modalPagarReserva, setModalPagarReserva ] = useState(false);
    const [ modalFormReserva, setModalFormReserva ] = useState(false);
    const [ modalTerminarReserva, setModalTerminarReserva ] = useState(false);
    const [ modalAnularReserva, setModalAnularReserva ] = useState(false);
    const [ modalFormLote, setModalFormLote ] = useState(false);
    const [ modalEliminarLote, setModaEliminarLote ] = useState(false);
    const [ modalFormTarifa, setModalFormTarifa ] = useState(false);
    const [ modalEliminarTarifa, setModaEliminarTarifa ] = useState(false);
    const [ reservas, setReservas ] = useState([]);
    const [ reserva, setReserva ] = useState({});
    const [ lotes, setLotes ] = useState([]);
    const [ lote, setLote ] = useState({});
    const [ tarifas, setTarifas ] = useState([]);
    const [ tarifa, setTarifa ] = useState({});

    const handleOpenMenu = () => {
        // setReservas([])
        setOpenMenu(!openMenu)
    }

    const obtenerReservas = async ({q = '', limite ='', orden = ''}) => {
        console.log('Se ACtivo obtener reservas');
        try {
            const { data } = await clienteAxios(`/reservas/buscar/patente?q=${q}&limite=${limite}&orden=${orden}`);
            console.log(data);
            setReservas(data);
        } catch (error) {
            console.log(error.response);
        }
    }

    // ENTRADA
    const handleModalPagarReserva = () => {
        setOpenMenu(false)
        setReserva({})
        setModalPagarReserva(!modalPagarReserva);
    }

    const handleModalCrearReserva = () => {
        setReserva({})
        setModalFormReserva(!modalFormReserva)
    }

    const handleModalTerminarReserva = () => {
        setModalTerminarReserva(!modalTerminarReserva)
    }

    const handleModalAnularReserva = () => {
        setOpenMenu(false)
        setReserva({})
        setModalAnularReserva(!modalAnularReserva)
    }

    const obtenerTarifasEntrada = async () => {
        try {
            const { data } = await clienteAxios(`/tarifas`);
            setTarifas(data);
            console.log(tarifas);
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleTarifa = tarifa => {
        setTarifa(tarifa)
    }

    const handleLote = lote => {
        setLote(lote)
    }
    
    const handleReserva = reserva => {
        setReserva(reserva)
    }

    const submitReserva = async reserva => {
        console.log(reserva);
        if ( reserva?.id ) {
            // await editarReserva(lote)
        } else {
            const { id, ...reservaCreate } = reserva
            console.log(reservaCreate);
            await crearReserva(reservaCreate)
        }

    }

    const crearReserva = async ({ tarifa = '', patente = '' }) => {

        try {
            const { data } = await clienteAxios.post('/reservas', { tarifa, patente, lote: lote._id });
            console.log(data);
            const lotesActualizados = lotes.map( loteState => loteState._id === data.lote._id ? data.lote : loteState )
            setLotes(lotesActualizados)
            // obtenerLotesEntrada()
            handleModalCrearReserva()
            toast.success(`Reserva Creada Correctamente`)
        } catch (error) {
            console.log(error.response.data.msg);
            toast.error(error.response.data.msg)
        }
    }

    const obtenerReservaPorLote = async lote => {
        try {
            const { data } = await clienteAxios(`/lotes/${lote._id}/reserva`);
            console.log(data);
            setReserva(data)
        } catch (error) {
            console.log(error.response);
        }
    }

    const terminarReserva = async () => {

        try {
            const { data } = await clienteAxios.put(`/reservas/condicion/${reserva._id}`, { condicion: 'Finalizada' });
            console.log(data);
            const lotesActualizados = lotes.map( loteState => loteState._id === data.lote._id ? data.lote : loteState )
            setLotes(lotesActualizados)
            handleModalTerminarReserva()
            toast.success(`Reserva Terminada Correctamente`)
        } catch (error) {
            console.log(error.response);
            toast.error(error.response)
        }
    }
    
    const pagarReserva = async ({ reserva, metodoPago }) => {
        try {
            const { data } = await clienteAxios.post('/pagos', { reserva, metodoPago });
            console.log(data);
            // const lotesActualizados = lotes.map( loteState => loteState._id === data.lote._id ? data.lote : loteState )
            // setLotes(lotesActualizados)
            handleModalPagarReserva()
            toast.success(`Reserva Pagada Correctamente`)
            obtenerReservas({limite: 3, orden: 'desc'})
            setOpenMenu(true)
        } catch (error) {
            console.log(error.response);
            toast.error(error.response)
        }
    }
    
    const anularReserva = async ({ observacion }) => {
        try {
            const { data } = await clienteAxios.put(`/reservas/condicion/${reserva._id}`, { condicion: 'Anulada', observacion });
            console.log(data);
            handleModalAnularReserva()
            toast.success(`Reserva Anulada Correctamente`)
            obtenerReservas({limite: 3, orden: 'desc'})
            setOpenMenu(true)
        } catch (error) {
            console.log(error.response);
            toast.error(error.response.data.msg)
        }
    }
    // LOTES
    const handleModalCrearLote = () => {
        setLote({})
        setModalFormLote(!modalFormLote);
    }

    const handleModalEditarLote = lote => {
        setLote(lote)
        setModalFormLote(!modalFormLote);
    }

    const handleModalEliminarLote = lote => {
        setLote(lote)
        setModaEliminarLote(!modalEliminarLote)
    }

    const obtenerLotes = async () => {
        setCargando(true)
        try {
            const { data: { lotes, pagination } } = await clienteAxios(`/lotes?page=${pagina}`);
            setPagina(pagination.number)
            setLotes(lotes);
            handlePaginator(pagination)
        } catch (error) {
            console.log(error.response);
        }
        setCargando(false)
    }

    const obtenerLotesEntrada = async () => {
        setCargando(true)
        try {
            const { data } = await clienteAxios(`/lotes`);
            setLotes(data);
        } catch (error) {
            console.log(error.response);
        }
        setCargando(false)
    }

    const eliminarLote = async () => {

        try {
          const { data } = await clienteAxios.delete(`/lotes/${lote._id}`);
        //   const lotesActualizados = lotes.filter( loteState => loteState._id !== lote._id )
        //   setLotes(lotesActualizados);
          obtenerLotes()
          setLote({})
          setModaEliminarLote(false)
          toast.success(data.msg)
        } catch (error) {
          console.log(error.response.data.msg);
          toast.error(error.response.data.msg)
        }
    }

    const submitLote = async lote => {
        console.log(lote);
        if ( lote?.id ) {
            await editarLote(lote)
        } else {
            const { id, ...loteCreate } = lote
            await crearLote(loteCreate)
        }

    }

    const crearLote = async ({ numero = '' }) => {

        try {
            const { data } = await clienteAxios.post('/lotes', { numero });
            // setLotes([ ...lotes, data ])
            obtenerLotes()
            handleModalCrearLote()
            toast.success(`Lote Numero ${data.numero} Creado Correctamente`)
        } catch (error) {
            console.log(error.response.data.msg);
            toast.error(error.response.data.msg)
        }
    }

    const editarLote = async ({id ='', numero = '' }) => {

        try {
            const { data } = await clienteAxios.put(`/lotes/${id}`, { numero });
            const lotesActualizados = lotes.map( loteState => loteState._id === data._id ? data : loteState )
            setLotes(lotesActualizados)
            handleModalCrearLote()
            toast.success(`Lote Actualizado Correctamente`)
        } catch (error) {
            console.log(error.response.data.msg);
            toast.error(error.response.data.msg)
        }
    }

    // TARIFAS

    const handleModalCrearTarifa = () => {
        setTarifa({})
        setModalFormTarifa(!modalFormTarifa);
    }

    const handleModalEditarTarifa = tarifa => {
        setTarifa(tarifa)
        setModalFormTarifa(!modalFormTarifa);
    }

    const handleModalEliminarTarifa = tarifa => {
        setTarifa(tarifa)
        setModaEliminarTarifa(!modalEliminarTarifa)
    }
    
    const obtenerTarifas = async () => {
        setCargando(true)
        try {
            const { data: { tarifas, pagination } } = await clienteAxios(`/tarifas?page=${pagina}`);
            setPagina(pagination.number)
            setTarifas(tarifas);
            handlePaginator(pagination)
        } catch (error) {
            console.log(error.response);
        }
        setCargando(false)
    }

    const eliminarTarifa = async () => {

        try {
          const { data } = await clienteAxios.delete(`/tarifas/${tarifa._id}`);
        //   const lotesActualizados = lotes.filter( loteState => loteState._id !== lote._id )
        //   setLotes(lotesActualizados);
          obtenerTarifas()
          setTarifa({})
          setModaEliminarTarifa(false)
          toast.success(data.msg)
        } catch (error) {
          console.log(error.response.data.msg);
          toast.error(error.response.data.msg)
        }
    }

    const submitTarifa = async tarifa => {
        console.log(tarifa);
        if ( tarifa?.id ) {
            await editarTarifa(tarifa)
        } else {
            const { id, ...tarifaCreate } = tarifa
            await crearTarifa(tarifaCreate)
        }

    }

    const crearTarifa = async ({ nombre = '', precioBase = 0, precioMinuto = 0, desdeMinuto = 0 }) => {

        try {
            const { data } = await clienteAxios.post('/tarifas', { nombre, precioBase, precioMinuto, desdeMinuto });
            // setTarifas([ ...tarifas, data ])
            obtenerTarifas()
            handleModalCrearTarifa()
            toast.success(`Tarifa ${data.nombre} Creada Correctamente`)
        } catch (error) {
            console.log(error.response.data.msg);
            toast.error(error.response.data.msg)
        }
    }

    const editarTarifa = async ({id ='', nombre = '', precioBase = 0, precioMinuto = 0, desdeMinuto = 0 }) => {

        try {
            const { data } = await clienteAxios.put(`/tarifas/${id}`, { nombre, precioBase, precioMinuto, desdeMinuto });
            const tarifasActualizadas = tarifas.map( tarifaState => tarifaState._id === data._id ? data : tarifaState )
            setTarifas(tarifasActualizadas)
            handleModalCrearTarifa()
            toast.success(`Tarifa Actualizada Correctamente`)
        } catch (error) {
            console.log(error.response.data.msg);
            toast.error(error.response.data.msg)
        }
    }


    return (
        <ParkingContext.Provider
            value={{
                handleOpenMenu,
                openMenu,
                obtenerReservas,
                reservas,
                modalPagarReserva,
                handleModalPagarReserva,
                pagarReserva,
                reserva,
                modalAnularReserva,
                handleModalAnularReserva,
                anularReserva,

                cargando,
                pagina,
                paginator,
                handlePaginator,
                handlePagina,

                modalFormReserva,
                handleModalCrearReserva,
                handleModalTerminarReserva,
                modalTerminarReserva,
                terminarReserva,
                obtenerReservaPorLote,
                handleReserva,
                obtenerTarifasEntrada,
                handleTarifa,
                handleLote,
                submitReserva,
                

                modalFormLote,
                modalEliminarLote,
                handleModalCrearLote,
                handleModalEditarLote,
                handleModalEliminarLote,
                obtenerLotes,
                eliminarLote,
                lotes,
                lote,
                setLote,
                submitLote,

                modalFormTarifa,
                modalEliminarTarifa,
                handleModalCrearTarifa,
                handleModalEditarTarifa,
                handleModalEliminarTarifa,
                obtenerTarifas,
                eliminarTarifa,
                tarifas,
                tarifa,
                setTarifa,
                submitTarifa,

                obtenerLotesEntrada
                
                
            }}
        >
            { children }
        </ParkingContext.Provider>
    )
}

export {
    ParkingProvider
}

export default ParkingContext;