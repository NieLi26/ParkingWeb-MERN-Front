export default function validarAnularReserva (valores) {
    let errores = {};

    // Validar tarifa
    if ( valores.observacion === '' ) {
        errores.observacion = "Observacion es obligatoria";
    } 

    return errores
}