export default function validarCrearReserva (valores) {
    let errores = {};

    // Validar tarifa
    if ( valores.tarifa === '' ) {
        errores.tarifa = "Tarifa es obligatoria";
    } 

    // Validar patente
    if ( valores.patente === '' ) {
        errores.patente = "Patente es obligatoria";
    } 


    // Validar empresa
    // if ( !valores.empresa ) {
    //     errores.empresa = "Nombre de Empresa es obligaotrio";
    // }

    // Validar url
    // if ( !valores.url ) {
    //     errores.url = "La URL del producto es obligatoria";
    // } else if ( !/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url) ) {
    //     errores.url = "URL mal formateada o no valida";
    // }

    // Validar descripcion
    // if ( !valores.descripcion ) {
    //     errores.descripcion = "Agrega la descripcion de tu producto";
    // }

    return errores
}