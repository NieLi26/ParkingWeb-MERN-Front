import { useEffect } from 'react';
import TableReserva from '../components/TableReserva'
import ModalCorregirAnulacion from "../components/ModalCorregirAnulacion";
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

            <ModalCorregirAnulacion />
            
            {/* <ModalEliminarPago /> */}
        </>
    )
}

export default Reservas