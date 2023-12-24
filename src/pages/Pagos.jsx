import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import TablePago from '../components/TablePago'
import { PDFViewer } from '@react-pdf/renderer';
// import ModalFormTarifa from "../components/ModalFormTarifa";
import ModalEliminarPago from "../components/ModalEliminarPago";
import ModalPreview from '../components/ModalPreview';
import SalidaTicket from "../components/SalidaTicket"
import useParking from "../hooks/useParking";
import useAuth from '../hooks/useAuth';
import GlobalSpinner from '../components/GlobalSpinner';

const ROLES_MAESTROS = ['ADMIN_ROLE', 'SUPER_ROLE']


const Pagos = () => {
    const { auth } = useAuth()
    const { cargando, obtenerPagos, pagina, pago } = useParking()

    useEffect(() => {
        obtenerPagos();
    }, [pagina]);

    if ( !ROLES_MAESTROS.includes(auth.rol) ) return <Navigate to={'/'} />
  
    if (cargando) return <GlobalSpinner />;
  
    return (
        <>
            <TablePago />

            <ModalPreview>
                <PDFViewer style={{ width: '100%', height: '70vh' }}>
                    <SalidaTicket pago={pago} />
                </PDFViewer>
            </ModalPreview>

            {/* <ModalFormTarifa /> */}
            
            {/* <ModalEliminarPago /> */}
        </>
    )
}

export default Pagos