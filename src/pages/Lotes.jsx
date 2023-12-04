import { useEffect } from 'react';
import TableLote from '../components/TableLote'
import ModalFormLote from "../components/ModalFormLote";
import ModalEliminarLote from "../components/ModalEliminarLote";
import useParking from "../hooks/useParking";
import GlobalSpinner from '../components/GlobalSpinner';

const Lotes = () => {

  const { cargando, obtenerLotes, pagina } = useParking()

  useEffect(() => {
    obtenerLotes();
  }, [pagina]);

  if (cargando) return <GlobalSpinner />;

  return (
      <>
        <TableLote />

        <ModalFormLote />
          
        <ModalEliminarLote />
      </>
  )
}

export default Lotes