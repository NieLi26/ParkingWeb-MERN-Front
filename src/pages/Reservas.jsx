import { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import TableReserva from '../components/TableReserva'
import ModalCorregirAnulacion from "../components/ModalCorregirAnulacion";
import ModalPreview from '../components/ModalPreview';
import EntradaTicket from "../components/EntradaTicket"
// import ModalEliminarPago from "../components/ModalEliminarPago";
import useParking from "../hooks/useParking";
import GlobalSpinner from '../components/GlobalSpinner';

const Reservas = () => {
    const { cargando, obtenerReservasPaginadas, pagina, reserva } = useParking()

    useEffect(() => {
        obtenerReservasPaginadas();
    }, [pagina]);
  
    if (cargando) return <GlobalSpinner />;
    console.log(reserva);
    return (
        <>
            <TableReserva />

            <ModalCorregirAnulacion />
            
            <ModalPreview>
                <PDFViewer style={{ width: '100%', height: '70vh' }}>
                    <EntradaTicket reserva={reserva} />
                </PDFViewer>
            </ModalPreview>

            {/* <ModalEliminarPago /> */}
        </>
    )
}

export default Reservas
