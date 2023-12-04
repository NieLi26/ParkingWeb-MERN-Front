import { useEffect } from 'react';
import TableTarifa from '../components/TableTarifa'
import ModalFormTarifa from "../components/ModalFormTarifa";
import ModalEliminarTarifa from "../components/ModalEliminarTarifa";
import useParking from "../hooks/useParking";
import GlobalSpinner from '../components/GlobalSpinner';

const Tarifas = () => {

    const { cargando, obtenerTarifas, pagina } = useParking()

    useEffect(() => {
        obtenerTarifas();
    }, [pagina]);
  
    if (cargando) return <GlobalSpinner />;
  
  return (
      <>
        <TableTarifa />

        <ModalFormTarifa />
          
        <ModalEliminarTarifa />
      </>
  )
}

export default Tarifas