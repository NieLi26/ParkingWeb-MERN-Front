import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import TableUsuario from '../components/TableUsuario';
import ModalFormUsuario from '../components/ModalFormUsuario';
import ModalEliminarUsuario from '../components/ModalEliminarUsuario';
import useParking from "../hooks/useParking";
import useAuth from '../hooks/useAuth';
import GlobalSpinner from '../components/GlobalSpinner';

const ROLES_MAESTROS = ['ADMIN_ROLE', 'SUPER_ROLE']

const Usuarios = () => {

    const { auth } = useAuth()

    const { cargando, obtenerUsuarios, pagina } = useParking()

    useEffect(() => {
        obtenerUsuarios();
    }, [pagina]);
  
    if ( !ROLES_MAESTROS.includes(auth.rol) ) return <Navigate to={'/'} />
    
    if (cargando) return <GlobalSpinner />;
  
  return (
      <>
        <TableUsuario />

        <ModalFormUsuario />
          
        <ModalEliminarUsuario />
      </>
  )
}

export default Usuarios