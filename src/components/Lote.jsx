import useParking from "../hooks/useParking";

const COLOR_CONDICION = {
    'Disponible': '#22C55E',
    'Ocupado': '#EF4444',
    'Reservado': '',
    'Mantenimiento': '',
}

const Lote = ({ lote }) => {

    const { condicion, numero } = lote;

    const { handleModalCrearReserva, handleModalTerminarReserva, handleLote, handleReserva, obtenerReservaPorLote  } = useParking();

    const handleClick = () => {
        if ( condicion === 'Disponible' ) {
            handleModalCrearReserva()
            handleLote(lote)
        } else if ( condicion === 'Ocupado' ) {
            handleModalTerminarReserva()
            obtenerReservaPorLote(lote)
            // handleReserva()
        }
    }

  return (
    <li 
        onClick={handleClick}
        className="open-modal cursor-pointer col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200 border-[2px] border-${color}-500  hover:shadow-xl hover:scale-110"
    >
        <div className="flex-1 flex flex-col p-8">
            <svg fill={COLOR_CONDICION[condicion]} className="w-32 h-32 flex-shrink-0 mx-auto  text-${color}-500" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 272.523 272.523" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M193.26,118.059c-0.877,0-1.777,0.126-2.677,0.373l-10.172,2.802L169.85,95.504c-2.993-7.289-11.838-13.22-19.717-13.22 h-98.85c-7.88,0-16.724,5.931-19.716,13.22l-10.548,25.694l-10.046-2.767c-0.899-0.247-1.799-0.373-2.676-0.373 c-4.808,0-8.297,3.673-8.297,8.732v5.996c0,5.906,4.806,10.712,10.712,10.712h1.151l-1.705,4.153 c-2.78,6.77-5.043,18.236-5.043,25.558v51.115c0,5.906,4.806,10.712,10.712,10.712h13.99c5.906,0,10.712-4.806,10.712-10.712 v-12.764h120.357v12.764c0,5.906,4.806,10.712,10.712,10.712h13.988c5.906,0,10.712-4.806,10.712-10.712V173.21 c0-7.321-2.263-18.787-5.043-25.558l-1.705-4.153h1.294c5.906,0,10.712-4.806,10.712-10.712v-5.996 C201.557,121.732,198.067,118.059,193.26,118.059z M28.698,137.681l15.978-38.918c1.79-4.36,7.11-7.928,11.823-7.928h88.418 c4.713,0,10.033,3.567,11.823,7.928l15.978,38.918c1.789,4.36-0.602,7.928-5.315,7.928H34.014 C29.3,145.608,26.909,142.041,28.698,137.681z M64.365,186.908c0,2.357-1.929,4.284-4.284,4.284H29.729 c-2.357,0-4.285-1.928-4.285-4.284v-14.566c0-2.356,1.928-4.284,4.285-4.284h30.352c2.355,0,4.284,1.928,4.284,4.284V186.908z M175.684,186.908c0,2.357-1.929,4.284-4.284,4.284h-30.352c-2.355,0-4.284-1.928-4.284-4.284v-14.566 c0-2.356,1.929-4.284,4.284-4.284h30.352c2.355,0,4.284,1.928,4.284,4.284V186.908z"></path> <g> <path d="M259.125,37.486H208.39c-7.388,0-13.398,6.011-13.398,13.398v50.736c0,7.388,6.011,13.399,13.398,13.399h20.367v113.872 c0,2.762,2.238,5,5,5c2.762,0,5-2.238,5-5V115.02h20.368c7.388,0,13.398-6.011,13.398-13.399V50.885 C272.523,43.497,266.513,37.486,259.125,37.486z M247.634,79.553c-2.918,2.627-7.216,3.959-12.774,3.959h-7.347 c-0.882,0-1.6,0.719-1.6,1.601v12.389c0,1.346-1.095,2.44-2.441,2.44h-5.564c-1.347,0-2.441-1.095-2.441-2.44V55.007 c0-1.347,1.095-2.442,2.441-2.442h14.016c9.285,0,12.751,1.399,15.599,3.816c3.004,2.549,4.526,6.453,4.526,11.606 C252.048,73.022,250.564,76.912,247.634,79.553z"></path> <path d="M239.681,62.825c-1.356-1.024-3.755-1.544-7.129-1.544h-5.039c-0.882,0-1.6,0.718-1.6,1.599v10.182 c0,0.881,0.718,1.599,1.6,1.599h3.019c1.109,0,2.901-0.082,3.994-0.183c1.061-0.097,4.056-0.531,5.155-1.361 c1.319-0.998,1.988-2.724,1.988-5.129C241.669,65.56,241,63.823,239.681,62.825z"></path> </g> </g></svg>
            <h3 className="mt-6 text-gray-900 text-2xl font-bold">{numero}</h3>
            <div className="mt-1 flex-grow flex flex-col justify-between">
                <div className="sr-only">Title</div>
                {/* <div className="mt-3">
                    <span className="px-2 py-1 text-${color}-500 text-xs font-medium bg-green-100 rounded-full">${displayType}</span>
                </div> */}
            </div>
        </div>
    </li>
  )
}

export default Lote