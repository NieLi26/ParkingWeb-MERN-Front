import { validarEmail } from "../helpers";

export default function validarCrearUsuario (valores, accion) {
    let errores = {};

    // Validar el nombre
    if ( valores.nombre === '' ) {
        errores.nombre = "El Nombre es obligatorio";
    }

    // Validar Email
    if ( valores.email === '' ) {
        errores.email = "El Correo es Obligatorio";
    } else if ( !validarEmail(valores.email) ){
        errores.email = 'Formato de Correo no Válido'
    }

    if ( accion === 'crear' ) {
        // Validar password
        if ( valores.password === '' ) {
            errores.password = "Contraseña  es Obligatoria";
        } else if ( valores.password.length < 6 ) {
            errores.password = "Contraseña debe ser mayor a 5 caracteres"; 
        }
        
        // Validar password 2
        if ( valores.password2 === '' ) {
            errores.password2 = "Repetir Contraseña es Obligatoria";
        } else if ( valores.password2.length < 6 ) {
            errores.password2 = "Repetir contraseña debe ser mayor a 5 caracteres"; 
        }

        if ( (valores.password && valores.password2 ) && valores.password !== valores.password2 ) {
            errores.password = "Las Contraseñas Deben ser Iguales"
        }
    }



    return errores
}
