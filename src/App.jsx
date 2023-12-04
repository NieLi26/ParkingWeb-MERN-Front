import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ParkingLayout from './layouts/ParkingLayout';
import Entrada from './pages/Entrada';
import Lotes from './pages/Lotes';
import Tarifas from './pages/Tarifas';
import Pagos from './pages/Pagos';
import { ParkingProvider } from './context/ParkingProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ParkingLayout />,
    children: [
      {
        index: true,
        element: <Entrada />
      },
      {
        path: '/lotes',
        element: <Lotes />
      },
      {
        path: '/tarifas',
        element: <Tarifas />
      },
      {
        path: '/pagos',
        element: <Pagos />
      }
    ]
  }
])


function App() {

  return (
    <ParkingProvider>
      <RouterProvider router={router} />
    </ParkingProvider>
  )
}

export default App
