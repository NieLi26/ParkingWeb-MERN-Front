export default function validarCrearLote (valores) {
    let errores = {};

    // Validar el numero del lote
    if ( valores.numero === '' ) {
        errores.numero = "El Numero es obligatorio";
    } else if ( valores.numero <= 0 ) {
        errores.numero = 'Numero debe ser mayor a 0'
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