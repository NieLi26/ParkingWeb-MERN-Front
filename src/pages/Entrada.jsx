import { useEffect } from "react";
import ModalFormEntrada from "../components/ModalFormEntrada";
import ModalTerminarReserva from "../components/ModalTerminarReserva";
import Lote from "../components/Lote"
import useParking from "../hooks/useParking";
import GlobalSpinner from '../components/GlobalSpinner';

const Entrada = () => {
    
    const { cargando, obtenerLotesEntrada, lotes, obtenerTarifasEntrada, modalFormReserva, tarifas } = useParking()

    useEffect(() => {
        obtenerLotesEntrada();
    }, []);

    useEffect(() => {
        if ( modalFormReserva ) {
            obtenerTarifasEntrada();
        }
    }, [modalFormReserva]);

    if (cargando) return <GlobalSpinner />;

  return (
    <>
        <div className="flex items-center justify-end gap-2 mb-3 p-3 rounded-xl bg-white shadow-lg">
            <div className="flex items-center">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 256 256"><g fill="#EF4444"><path d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96Z" opacity=".2"/><path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z"/></g></svg>
                <span className="font-bold text-[#EF4444]">Ocupado</span>
            </div>
            <div className="flex items-center">
                <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 256 256"><g fill="#22C55E"><path d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96Z" opacity=".2"/><path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z"/></g></svg>    
                <span className="font-bold text-[#22C55E]">Disponible</span>
            </div>
        </div>

        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">   
            { lotes.map( lote => 
                <Lote
                    key={lote.numero} 
                    lote={lote}
                />
            )}
        </ul>

        <ModalFormEntrada />
        <ModalTerminarReserva />
    </>
  )
}

export default Entrada