import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({name}){

    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });
    /*const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState('');*/

    React.useEffect(() => {
        console.log("Empezando el efecto");
        if(state.loading){
            setState({...state, error: false});
            setTimeout(() => {
                console.log("Haciendo validacion");
                if(state.value !== SECURITY_CODE){
                    setState({...state, error: true, loading: false});                   
                }else{
                    setState({...state, error: false, loading: false, confirmed: true});
                }
                console.log("Terminando validacion");
            }, 3000);
        }        
        console.log("Terminando el efecto");
    }, [state.loading]);

    if(!state.deleted && !state.confirmed){
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad</p>
    
                {(state.error && !state.loading) && (
                    <p>Error: El código es incorrecto</p>
                )}
    
                {state.loading && (
                    <p>Cargando...</p>
                )}
    
                <input 
                    onChange={(event) => {
                        setState({
                            ...state,
                            value: event.target.value,
                        });
                    }} 
                    value={state.value} 
                    placeholder="Código de seguridad"/>
                <button
                    onClick={() => setState({...state, loading: true})}>Comprobar</button>
            </div>
        );
    }else if(!state.deleted && state.confirmed){
        return (
            <>
                <p>edimos confirmacipon. ¿Tas segure?</p>
                <button onClick={()=>{
                    setState({
                        ...state,
                        deleted: true
                    });
                }}>
                    Sí, eliminar
                </button>                
                <button onClick={()=>{
                    setState({
                        ...state,
                        confirmed: false,
                    });
                }}>
                    No, me arrepentí
                </button>           
            </>
        );
    }else{
        return (
            <>
                <p>Eliminado con éxito</p>
                <button onClick={() => {
                    setState({
                        ...state,
                        confirmed: false, 
                        deleted: false,
                        value: ''
                    });

                }}>Restaurar</button>
            </>
        );
    }
  
}

export { UseState };