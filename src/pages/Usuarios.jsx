import { useEffect } from 'react';
import TableUsuario from '../components/TableUsuario';
import ModalFormUsuario from '../components/ModalFormUsuario';
import ModalEliminarUsuario from '../components/ModalEliminarUsuario';
import useParking from "../hooks/useParking";
import GlobalSpinner from '../components/GlobalSpinner';

const Usuarios = () => {

    const { cargando, obtenerUsuarios, pagina } = useParking()

    useEffect(() => {
        obtenerUsuarios();
    }, [pagina]);
  
    if (cargando) return <GlobalSpinner />;
  
  return (
      <>
        <TableUsuario />

        <ModalFormUsuario />
          
        {/* <ModalEliminarUsuario /> */}
      </>
  )
}

export default Usuarios