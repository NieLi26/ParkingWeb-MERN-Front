export default function validarCrearPago (valores) {
    let errores = {};

    const metodosPago = ['Efectivo', 'Transferencia', 'Debito', 'Credito']

    // Validar Metodo de Pago
    if ( valores.metodoPago === '' ) {
        errores.metodoPago = "El Metodo de Pago es obligatorio";
    } else if ( !metodosPago.includes(valores.metodoPago) ) {
        errores.metodoPago = "Metodoo de Pago no Valido";
    }

    return errores
}