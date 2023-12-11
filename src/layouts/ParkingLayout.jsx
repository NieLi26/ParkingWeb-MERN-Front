import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import AuthSpinner from '../components/AuthSpinner';

import useAuth from '../hooks/useAuth';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ParkingLayout() {

  const { auth, cargando } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false)

  // para esperar que se llene el state de auth
  if (cargando) return <AuthSpinner />

  if (Object.values(auth).length === 0) return <Navigate to="/login" />

  return (
    <>
      <div>
        <ToastContainer />
        <Sidebar 
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            classNames={classNames}
        />
        
        <div className="md:pl-64 flex flex-col flex-1">
          <Header 
            setSidebarOpen={setSidebarOpen}
            classNames={classNames}
          />

          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                  <div className=" border-gray-200 rounded-lg h-96">
                    <Outlet />
                  </div>
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
