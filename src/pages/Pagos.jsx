import { useEffect } from 'react';
import TablePago from '../components/TablePago'
// import ModalFormTarifa from "../components/ModalFormTarifa";
import ModalEliminarPago from "../components/ModalEliminarPago";
import useParking from "../hooks/useParking";
import GlobalSpinner from '../components/GlobalSpinner';

const Pagos = () => {
    const { cargando, obtenerPagos, pagina } = useParking()

    useEffect(() => {
        obtenerPagos();
    }, [pagina]);
  
    if (cargando) return <GlobalSpinner />;
  
    return (
        <>
            <TablePago />

            {/* <ModalFormTarifa /> */}
            
            {/* <ModalEliminarPago /> */}
        </>
    )
}

export default Pagos