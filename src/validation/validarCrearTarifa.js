export default function validarCrearLote (valores) {
    let errores = {};

    // Validar el nombre del tarifa
    if ( valores.nombre === '' ) {
        errores.nombre = "El Nombre es obligatorio";
    } else if ( valores.nombre <= 0 ) {
        errores.nombre = 'Nombre debe ser mayor a 0'
    }

    // Validar el precio por minuto
    if ( valores.precioMinuto === '' ) {
        errores.precioMinuto = "El Precio por Minuto es obligatorio";
    } else if ( valores.precioMinuto <= 0 ) {
        errores.precioMinuto = 'Precio por Minuto debe ser mayor a 0'
    }

    // Validar el precio base
    if ( valores.precioBase === '' ) {
        errores.precioBase = "El Precio Base es obligatorio";
    } else if ( valores.precioBase <= 0 ) {
        errores.precioBase = 'Precio Base debe ser mayor a 0'
    }

    // Validar el desde minuto
    if ( valores.desdeMinuto === '' ) {
        errores.desdeMinuto = "Desde Los e es obligatorio";
    } else if ( valores.desdeMinuto <= 0 ) {
        errores.desdeMinuto = 'Desde Los debe ser mayor a 0'
    }

    return errores
}
