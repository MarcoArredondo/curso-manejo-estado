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

    const onConfirm = () => {
        setState({...state, error: false, loading: false, confirmed: true});
    };

    const onError = () => {
        setState({...state, error: true, loading: false});
    };

    const onWrite = (value) => {
        setState({...state, value: value,});
    };

    const onCheck = () => {
        setState({...state, loading: true})
    };

    const onDelete = () => {
        setState({...state, deleted: true});
    };

    const onReset = () => {
        setState({
            ...state,
            confirmed: false,
            deleted: false, 
            value: ''
        });
    };

    React.useEffect(() => {
        console.log("Empezando el efecto");
        if(state.loading){
            setState({...state, error: false});
            setTimeout(() => {
                console.log("Haciendo validacion");
                if(state.value !== SECURITY_CODE){
                    onError();                   
                }else{
                    onConfirm();
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
                        onWrite(event.target.value);
                    }} 
                    value={state.value} 
                    placeholder="Código de seguridad"/>
                <button onClick={() => onCheck()}>
                        Comprobar
                </button>
            </div>
        );
    }else if(!state.deleted && state.confirmed){
        return (
            <>
                <p>Pedimos confirmación. ¿Tas segure?</p>
                <button onClick={()=>{ onDelete() }}>
                    Sí, eliminar
                </button>                
                <button onClick={()=>{ onReset()}}>
                    No, me arrepentí
                </button>           
            </>
        );
    }else{
        return (
            <>
                <p>Eliminado con éxito</p>
                <button onClick={() => { onReset() }}>Restaurar</button>
            </>
        );
    }
  
}

export { UseState };