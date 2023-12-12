import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ParkingLayout from './layouts/ParkingLayout';
import Entrada from './pages/Entrada';
import Salida from './pages/Salida';
import Lotes from './pages/Lotes';
import Tarifas from './pages/Tarifas';
import Pagos from './pages/Pagos';
import Reservas from './pages/Reservas';
import Usuarios from './pages/Usuarios';
import Home from './pages/Home';
import DashBoard from './pages/DashBoard';
import Login from './pages/Login';
import { ParkingProvider } from './context/ParkingProvider';
import { AuthProvider } from './context/AuthProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ParkingLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/entrada',
        element: <Entrada />
      },
      {
        path: '/salida',
        element: <Salida />
      },
      // {
      //   path: '/lotes',
      //   element: <Lotes />
      // },
      {
        path: '/tarifas',
        element: <Tarifas />
      },
      {
        path: '/pagos',
        element: <Pagos />
      },
      {
        path: '/reservas',
        element: <Reservas />
      },
      {
        path: '/usuarios',
        element: <Usuarios />
      },
      {
        path: '/dashboard',
        element: <DashBoard />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])


function App() {

  return (
    <AuthProvider>
      <ParkingProvider>
        <RouterProvider router={router} />
      </ParkingProvider>
    </AuthProvider>

  )
}

export default App
