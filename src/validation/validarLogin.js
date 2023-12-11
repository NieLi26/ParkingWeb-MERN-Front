import { validarEmail } from "../helpers";

export default function validarLogin (valores) {
    let errores = {};

    // Validar Email
    if ( valores.email === '' ) {
        errores.email = "El Correo es Obligatorio";
    } else if ( !validarEmail(valores.email) ){
        errores.email = 'Formato de Correo no Válido'
    }

    // Validar password
    if ( valores.password === '' ) {
        errores.password = "Contraseña es Obligatoria";
    }

    return errores
}