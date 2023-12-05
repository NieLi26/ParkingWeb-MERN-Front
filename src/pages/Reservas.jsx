import { useEffect } from 'react';
import TableReserva from '../components/TableReserva'
// import ModalFormTarifa from "../components/ModalFormTarifa";
// import ModalEliminarPago from "../components/ModalEliminarPago";
import useParking from "../hooks/useParking";
import GlobalSpinner from '../components/GlobalSpinner';

const Reservas = () => {
    const { cargando, obtenerReservasPaginadas, pagina } = useParking()

    useEffect(() => {
        obtenerReservasPaginadas();
    }, [pagina]);
  
    if (cargando) return <GlobalSpinner />;
  
    return (
        <>
            <TableReserva />

            {/* <ModalFormTarifa /> */}
            
            {/* <ModalEliminarPago /> */}
        </>
    )
}

export default Reservas