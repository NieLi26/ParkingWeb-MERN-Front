import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [ auth, setAuth ] = useState({});
    const [ cargando, setCargando ] = useState(true);

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = JSON.parse(localStorage.getItem('token'))

            if ( !token ) {
                setCargando(false)
                return;
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('auth/perfil/token', config)
                setAuth(data)
            } catch (error) {
                console.log('entroooo a catch auth');
                console.log(error);
                setAuth({})
            }

            setCargando(false)
        }
        autenticarUsuario();
    }, []);

    const cerrarSesion = () => {
        console.log('se uso cerrar sesion');
        setAuth({})
        localStorage.removeItem('token');
    }

    // const actualizarToken = async token => {
    //     try {
    //         const { data } = await clienteAxios.post('/v1/accounts/token/refresh/', { refresh: token })
    //         console.log('nuevo token: ', data);
    //         const tokenLS = JSON.parse(localStorage.getItem('token'))
    //         // if (!tokenLS) {
    //         //     return
    //         // }
    //         tokenLS.access = data.access
    //         localStorage.setItem('token', JSON.stringify(tokenLS))
    //         // setAuth(data)
    //         // navigate('/reserva')
    //     } catch (error) {
    //         console.log(error.response.data.detail);
    //     }
    // }

    // // Refrescar token cada tantos minutos
    // useEffect(() => {
    //     const cuatroMinutos = 1000 * 60 * 4
    //     const interval = setInterval(() => {
    //         if ( auth?.id ) {
    //             const token = JSON.parse(localStorage.getItem('token'))
    //             actualizarToken(token.refresh)
    //         }
    //     }, cuatroMinutos);
    //     console.log('actualizado');
    //     return () => clearInterval(interval)
    // }, [auth])


    
    const submitLogin = async (form) => {
        setCargando(true)

        try {
            const { data } = await clienteAxios.post('auth/login', form)
            console.log(data);
            localStorage.setItem('token', JSON.stringify(data.token))
            setAuth(data)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg)
            throw true;
        } finally {
            setCargando(false)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                submitLogin,
                cerrarSesion,
                cargando
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}


export {
    AuthProvider
}

export default AuthContext