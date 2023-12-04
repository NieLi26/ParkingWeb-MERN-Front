// export const formatearFecha = fecha => {
//     const nuevaFecha = new Date(fecha.split('T')[0].split('-'))

//     const opciones = {
//         weekday: 'long',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//     }

//     return nuevaFecha.toLocaleDateString('es-ES', opciones)
// }

export const formatearFecha = fecha => {
    const nuevaFecha = new Date(fecha)

    const opciones = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return nuevaFecha.toLocaleDateString('es-ES', opciones)
}

export const formatearFechaMenu = fecha => {
    const nuevaFecha = new Date(fecha)

    const opciones = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
    const amPm = nuevaFecha.getHours() < 12 ? "AM" : "PM";
    return nuevaFecha.toLocaleDateString('es-ES', opciones) + ' ' + amPm
}
