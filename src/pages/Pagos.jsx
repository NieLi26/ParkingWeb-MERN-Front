import { useEffect } from 'react';
import TablePago from '../components/TablePago'
// import ModalFormTarifa from "../components/ModalFormTarifa";
// import ModalEliminarTarifa from "../components/ModalEliminarTarifa";
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

            {/* <ModalFormTarifa />
            
            <ModalEliminarTarifa /> */}
        </>
    )
}

export default Pagos