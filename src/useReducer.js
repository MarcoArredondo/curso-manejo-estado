import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({name}){

    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        console.log("Empezando el efecto");
        if(state.loading){
            //setState({...state, error: false});
            setTimeout(() => {
                console.log("Haciendo validacion");
                if(state.value !== SECURITY_CODE){
                    dispatch({type: 'ERROR'});             
                }else{
                    dispatch({type: 'CONFIRM'});
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
                        dispatch({type: 'WRITE', payload: event.target.value});
                        //onWrite(event.target.value);
                    }} 
                    value={state.value} 
                    placeholder="Código de seguridad"/>
                <button onClick={() => dispatch({type: 'CHECK'})}>
                        Comprobar
                </button>
            </div>
        );
    }else if(!state.deleted && state.confirmed){
        return (
            <>
                <p>Pedimos confirmación. ¿Tas segure?</p>
                <button onClick={()=>{ dispatch({type:'DELETE'}) }}>
                    Sí, eliminar
                </button>                
                <button onClick={()=>{ dispatch({type: 'RESET'})}}>
                    No, me arrepentí
                </button>           
            </>
        );
    }else{
        return (
            <>
                <p>Eliminado con éxito</p>
                <button onClick={() => { dispatch({type: 'RESET'}) }}>Restaurar</button>
            </>
        );
    }
  
}


const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};

    //Differents forms to create a reducer. #1
    // const reducer = (state, action) => {
    //     if(action.type === 'ERROR'){
    //         return {
    //             ...state,
    //             error: true,
    //             loading: false,
    //         };
    //     }else if(action.type === "CHECK"){
    //         return {
    //             ...state,
    //             loading: true,
    //         };
    //     } else {
    //         return {
    //             ...state,
    //         }
    //     }
    // };

    //Differents forms to create a reducer. #2
    const reducerSwitch = (state, action) => {
        switch (action.type){
            case 'CONFIRM':
                return {...state, error: false, loading: false, confirmed: true};
            case 'ERROR':
                return {...state, error: true, loading: false};
            case 'CHECK':
                return {
                    ...state,
                    loading: true,
                };
            default:
                return {
                    ...state,
                }
        }
    };

    //Differents forms to create a reducer. #3
    const reducerObject = (state, payload)=> ({
        'CONFIRM': {...state, error: false, loading: false, confirmed: true},
        'ERROR': {...state, error: true, loading: false},
        'CHECK': {...state, loading: true},
        'DELETE': {...state, deleted: true},
        'RESET': {...state, confirmed: false, deleted: false, value: ''},
        'WRITE': {...state, value: payload}
    });

    const reducer = (state, action) => {
        if(reducerObject(state)[action.type]){
            return reducerObject(state, action.payload)[action.type];
        }else{
            return state;
        }
    };

export { UseReducer };    
