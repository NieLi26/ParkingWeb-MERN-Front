import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import clienteAxios from "../config/clienteAxios";
import ModalEliminarPago from "../components/ModalEliminarPago";

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
    const [ modalPagarReservaSalida, setModalPagarReservaSalida ] = useState(false);
    const [ modalFormReserva, setModalFormReserva ] = useState(false);
    const [ modalTerminarReserva, setModalTerminarReserva ] = useState(false);
    const [ modalAnularReserva, setModalAnularReserva ] = useState(false);
    const [ modalAnularReservaSalida, setModalAnularReservaSalida ] = useState(false);
    const [ modalFormLote, setModalFormLote ] = useState(false);
    const [ modalEliminarLote, setModaEliminarLote ] = useState(false);
    const [ modalFormTarifa, setModalFormTarifa ] = useState(false);
    const [ modalEliminarTarifa, setModaEliminarTarifa ] = useState(false);
    const [ modalEliminarPago, setModalEliminarPago ] = useState(false);
    const [ modalCorregirAnulacionReserva, setModalCorregirAnulacionReserva ] = useState(false);
    const [ reservas, setReservas ] = useState([]);
    const [ reserva, setReserva ] = useState({});
    const [ reservaSalida, setReservaSalida ]= useState({})
    const [ lotes, setLotes ] = useState([]);
    const [ lote, setLote ] = useState({});
    const [ tarifas, setTarifas ] = useState([]);
    const [ tarifa, setTarifa ] = useState({});
    const [ pagos, setPagos ] = useState([]);
    const [ pago, setPago ] = useState({});
    const [ reservasPaginadas, setReservasPaginadas ] = useState([]);
    

    const handleOpenMenu = () => {
        // setReservas([])
        setOpenMenu(!openMenu)
    }

    const obtenerReservas = async ({q = '', limite ='', orden = ''}) => {

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

        const token = JSON.parse(localStorage.getItem('token'))
        if ( !token ) return

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios(`/tarifas`, config);
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

        const token = JSON.parse(localStorage.getItem('token'))
        if ( !token ) return

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.post('/reservas', { tarifa, patente, lote: lote._id }, config);
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
        const token = JSON.parse(localStorage.getItem('token'))
        if ( !token ) return

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios(`/lotes/${lote._id}/reserva`, config);
            console.log(data);
            setReserva(data)
        } catch (error) {
            console.log(error.response);
        }
    }

    const terminarReserva = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        if ( !token ) return

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put(`/reservas/condicion/${reserva._id}`, { condicion: 'Finalizada' }, config);
            console.log('de finalizada', data);
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
        const token = JSON.parse(localStorage.getItem('token'))
        if ( !token ) return

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.post('/pagos', { reserva, metodoPago }, config);
            console.log(data);
            // const lotesActualizados = lotes.map( loteState => loteState._id === data.lote._id ? data.lote : loteState )
            // setLotes(lotesActualizados)
            if ( Object.values(reservaSalida).length !== 0 ) {
                handleModalPagarReservaSalida()
            } else {
                handleModalPagarReserva()
            }
      
            toast.success(`Reserva con patente ${data.patente} Pagada Correctamente`)
            obtenerReservas({limite: 3, orden: 'desc'})
            // setOpenMenu(true)
        } catch (error) {
            console.log(error.response);
            toast.error(error.response)
        }
    }
    
    const anularReserva = async ({ observacion }) => {
        const token = JSON.parse(localStorage.getItem('token'))
        if ( !token ) return

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            if ( Object.values(reservaSalida).length !== 0 ) {
                const { data } = await clienteAxios.put(`/reservas/condicion/${reservaSalida._id}`, { condicion: 'Anulada', observacion }, config);
                console.log(data);
                handleModalAnularReservaSalida()
            } else {
                const { data } = await clienteAxios.put(`/reservas/condicion/${reserva._id}`, { condicion: 'Anulada', observacion }, config);
                console.log(data);
                handleModalAnularReserva()
            }
         
            toast.success(`Reserva Anulada Correctamente`)
            obtenerReservas({limite: 3, orden: 'desc'})
            // setOpenMenu(true)
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

        const token = JSON.parse(localStorage.getItem('token'))
        if ( !token ) return

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data: { lotes, pagination } } = await clienteAxios(`/lotes?page=${pagina}`, config);
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

        const token = JSON.parse(localStorage.getItem('token'))
        if ( !token ) return

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios(`/lotes`, config);
            setLotes(data);
        } catch (error) {
            console.log(error.response);
        }
        setCargando(false)
    }

    const eliminarLote = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        if ( !token ) return

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
          const { data } = await clienteAxios.delete(`/lotes/${lote._id}`, config);
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

        if ( lote?.id ) {
            await editarLote(lote)
        } else {
            const { id, ...loteCreate } = lote
            await crearLote(loteCreate)
        }

    }

    const crearLote = async ({ numero = '' }) => {
        const token = JSON.parse(localStorage.getItem('token'))
        if ( !token ) return

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.post('/lotes', { numero }, config);
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
        const token = JSON.parse(localStorage.getItem('token'))
        if ( !token ) return

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put(`/lotes/${id}`, { numero }, config);
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

        const token = JSON.parse(localStorage.getItem('token'))
        if ( !token ) return

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data: { tarifas, pagination } } = await clienteAxios(`/tarifas?page=${pagina}`, config);
            setPagina(pagination.number)
            setTarifas(tarifas);
            handlePaginator(pagination)
        } catch (error) {
            console.log(error.response);
        }
        setCargando(false)
    }

    const eliminarTarifa = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        if ( !token ) return

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
          const { data } = await clienteAxios.delete(`/tarifas/${tarifa._id}`, config);
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
        const token = JSON.parse(localStorage.getItem('token'))
        if ( !token ) return

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.post('/tarifas', { nombre, precioBase, precioMinuto, desdeMinuto }, config);
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
        const token = JSON.parse(localStorage.getItem('token'))
        if ( !token ) return

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put(`/tarifas/${id}`, { nombre, precioBase, precioMinuto, desdeMinuto }, config);
            const tarifasActualizadas = tarifas.map( tarifaState => tarifaState._id === data._id ? data : tarifaState )
            setTarifas(tarifasActualizadas)
            handleModalCrearTarifa()
            toast.success(`Tarifa Actualizada Correctamente`)
        } catch (error) {
            console.log(error.response.data.msg);
            toast.error(error.response.data.msg)
        }
    }

    // PAGOS
    const obtenerPagos = async () => {
        setCargando(true)

        const token = JSON.parse(localStorage.getItem('token'))
        if ( !token ) return

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data: { pagos, pagination } } = await clienteAxios(`/pagos?page=${pagina}`, config);
            console.log(pagos);
            setPagina(pagination.number)
            setPagos(pagos);
            handlePaginator(pagination)
        } catch (error) {
            console.log(error.response);
        }
        setCargando(false)
    }

    const eliminarPago = async () => {
        const token = JSON.parse(localStorage.getItem('token'))
        if ( !token ) return

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
          const { data } = await clienteAxios.delete(`/pagos/${pago._id}`, config);
        //   const lotesActualizados = lotes.filter( loteState => loteState._id !== lote._id )
        //   setLotes(lotesActualizados);
          obtenerPagos()
          setPago({})
          setModalEliminarPago(false)
          toast.success(data.msg)
        } catch (error) {
          console.log(error.response.data.msg);
          toast.error(error.response.data.msg)
        }
    }

    const handleModalEliminarPago = pago => {
        setPago(pago)
        setModalEliminarPago(!modalEliminarPago)
    }

    // RESERVAS TABLA
    const handleModalCorregirAnulacionReserva = reserva => {
        setReserva(reserva)
        setModalCorregirAnulacionReserva(!modalCorregirAnulacionReserva);
    }

    const obtenerReservasPaginadas = async () => {
        setCargando(true)

        const token = JSON.parse(localStorage.getItem('token'))
        if ( !token ) return

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data: { reservas, pagination } } = await clienteAxios(`/reservas?page=${pagina}`, config);
            console.log('Reservas', reservas);
            setPagina(pagination.number)
            setReservasPaginadas(reservas);
            handlePaginator(pagination)
        } catch (error) {
            console.log(error.response);
        }
        setCargando(false)
    }

    const corregirAnulacionReserva = async ({ metodoPago }) => {
        const token = JSON.parse(localStorage.getItem('token'))
        if ( !token ) return

        const config = {
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.post('/pagos', { reserva: reserva._id, metodoPago }, config);
            const actualizacionReservasPaginadas = reservasPaginadas.map( reservaState => reservaState._id === data._id ? data : reservaState )
            setReservasPaginadas(actualizacionReservasPaginadas);
            setReserva({})
            setModalCorregirAnulacionReserva(false)
            toast.success(`Reserva con patente ${data.patente} Pagada Correctamente`)
        } catch (error) {
            console.log(error.response);
            toast.error(error.response.data.msg)
        }
    }

    // SALIDA
    const handleReservaSalida = reserva => {
        setReservaSalida(reserva)
    }

    const handleModalPagarReservaSalida = () => {
        setReservaSalida({})
        setModalPagarReservaSalida(!modalPagarReservaSalida);
    }

    const handleModalAnularReservaSalida = () => {
        setReservaSalida({})
        setModalAnularReservaSalida(!modalAnularReservaSalida)
    }

    // const pagarReservaPagina = async ({ reserva, metodoPago }) => {
    //     try {
    //         const { data } = await clienteAxios.post('/pagos', { reserva, metodoPago });
    //         console.log(data);
    //         // const lotesActualizados = lotes.map( loteState => loteState._id === data.lote._id ? data.lote : loteState )
    //         // setLotes(lotesActualizados)
    //         handleModalPagarReserva()
    //         toast.success(`Reserva con patente ${data.patente} Pagada Correctamente`)
    //         // obtenerReservas({limite: 3, orden: 'desc'})
    //         // setOpenMenu(true)
    //     } catch (error) {
    //         console.log(error.response);
    //         toast.error(error.response)
    //     }
    // }

    // const anularReservaPagina = async ({ observacion }) => {
    //     try {
    //         const { data } = await clienteAxios.put(`/reservas/condicion/${reserva._id}`, { condicion: 'Anulada', observacion });
    //         console.log(data);
    //         handleModalAnularReserva()
    //         toast.success(`Reserva Anulada Correctamente`)
    //         // obtenerReservas({limite: 3, orden: 'desc'})
    //         // setOpenMenu(true)
    //     } catch (error) {
    //         console.log(error.response);
    //         toast.error(error.response.data.msg)
    //     }
    // }

    // const pagarReserva = async ({ reserva, metodoPago }) => {
    //     try {
    //         const { data } = await clienteAxios.post('/pagos', { reserva, metodoPago });
    //         console.log(data);
    //         // const lotesActualizados = lotes.map( loteState => loteState._id === data.lote._id ? data.lote : loteState )
    //         // setLotes(lotesActualizados)
    //         handleModalPagarReserva()
    //         toast.success(`Reserva Pagada Correctamente`)
    //         obtenerReservas({limite: 3, orden: 'desc'})
    //         setOpenMenu(true)
    //     } catch (error) {
    //         console.log(error.response);
    //         toast.error(error.response)
    //     }
    // }

    // const handleModalPagarReserva = () => {
    //     setOpenMenu(false)
    //     setReserva({})
    //     setModalPagarReserva(!modalPagarReserva);
    // }

    return (
        <ParkingContext.Provider
            value={{
                // MENU HEADER
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

                // EXTRAS
                cargando,
                pagina,
                paginator,
                handlePaginator,
                handlePagina,

                // RESERVAS
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
                obtenerLotesEntrada,

                obtenerReservasPaginadas,
                reservasPaginadas,
                corregirAnulacionReserva,
                handleModalCorregirAnulacionReserva,
                modalCorregirAnulacionReserva,

                // pagarReservaPagina,
                // anularReservaPagina,

                // LOTES
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

                // TARIFAS
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
                
                // PAGOS
                obtenerPagos,
                pagos,
                eliminarPago,
                handleModalEliminarPago,
                modalEliminarPago,

                // SALIDA
                reservaSalida,
                handleReservaSalida,
                modalPagarReservaSalida,
                modalAnularReservaSalida,
                handleModalPagarReservaSalida,
                handleModalAnularReservaSalida
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