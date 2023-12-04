import { useState, useEffect } from "react"
import { toast } from "react-toastify";


const useValidation = (stateInicial, validar, fn) => {

    const [ valores, setValores ] = useState(stateInicial);
    const [ errores, setErrores ] = useState({});
    const [ submitForm, setSubmitForm ] = useState(false);

    const resetState = () => {
        setValores(stateInicial);
    }

    useEffect(() => {
        if ( submitForm ) {
            if ( Object.keys(errores).length === 0 ) {
                fn(); // fn = Funcion que se ejecuta en el componente
                return;
            } else {
                for ( let error of Object.values(errores) ) {
                    toast.error(error)
                }
            }
            setSubmitForm(false);
        }
    }, [errores]);

    // Funcion que se ejecuta confirme el usuario escribe algo
    const handleChange = e => {
        setValores({
            ...valores,
            [e.target.name]: e.target.value
        })
    }

    // Funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();

        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
        setSubmitForm(true);
    }

    // cuando se realiza el evento de blur
    // const handleBlur = () => {
    //     const erroresValidacion = validar(valores);
    //     setErrores(erroresValidacion)
    // }


  return {
    valores,
    errores,
    handleSubmit,
    handleChange,
    resetState
    // handleBlur
  }
}

export default useValidation