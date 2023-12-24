import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import TableLote from '../components/TableLote'
import ModalFormLote from "../components/ModalFormLote";
import ModalEliminarLote from "../components/ModalEliminarLote";
import useParking from "../hooks/useParking";
import useAuth from '../hooks/useAuth';
import GlobalSpinner from '../components/GlobalSpinner';

const Lotes = () => {

  const { auth } = useAuth()

  const { cargando, obtenerLotes, pagina } = useParking()

  useEffect(() => {
    obtenerLotes();
  }, [pagina]);

  if ( auth.rol !== 'SUPER_ROLE' ) return <Navigate to={'/'} />

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