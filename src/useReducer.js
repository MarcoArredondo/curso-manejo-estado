import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({name}){

    const [state, dispatch] = React.useReducer(reducer, initialState);

    const onConfirm = () => {
        dispatch({type: actionTypes.confirm});
    };

    const onError = () => {
        dispatch({type: actionTypes.error});     
    };

    const onWrite = (value) => {
        dispatch({type: actionTypes.write, payload: value});
    };

    const onCheck = () => {
        dispatch({type: actionTypes.check});
    };

    const onDelete = () => {
        dispatch({type: actionTypes.delete});
    };

    const onReset = () => {
        dispatch({type: actionTypes.reset});
    };

    React.useEffect(() => {
        console.log("Empezando el efecto");
        if(state.loading){
            //setState({...state, error: false});
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
                <button onClick={onCheck}>
                    Comprobar
                </button>
            </div>
        );
    }else if(!state.deleted && state.confirmed){
        return (
            <>
                <p>Pedimos confirmación. ¿Tas segure?</p>
                <button onClick={onDelete}>
                    Sí, eliminar
                </button>                
                <button onClick={onReset}>
                    No, me arrepentí
                </button>           
            </>
        );
    }else{
        return (
            <>
                <p>Eliminado con éxito</p>
                <button onClick={onReset}>Restaurar</button>
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
    // const reducerSwitch = (state, action) => {
    //     switch (action.type){
    //         case 'CONFIRM':
    //             return {...state, error: false, loading: false, confirmed: true};
    //         case 'ERROR':
    //             return {...state, error: true, loading: false};
    //         case 'CHECK':
    //             return {
    //                 ...state,
    //                 loading: true,
    //             };
    //         default:
    //             return {
    //                 ...state,
    //             }
    //     }
    // };

    const actionTypes = {
        confirm: 'CONFIRM',
        error: 'ERROR',
        write: 'WRITE',
        check: 'CHECK',
        delete: 'DELETE',
        reset: 'RESET'

    }
    //Differents forms to create a reducer. #3
    const reducerObject = (state, payload)=> ({
        [actionTypes.confirm]: {...state, error: false, loading: false, confirmed: true},
        [actionTypes.error]: {...state, error: true, loading: false},
        [actionTypes.check]: {...state, loading: true},
        [actionTypes.delete]: {...state, deleted: true},
        [actionTypes.reset]: {...state, confirmed: false, deleted: false, value: ''},
        [actionTypes.write]: {...state, value: payload}
    });

    const reducer = (state, action) => {
        if(reducerObject(state)[action.type]){
            return reducerObject(state, action.payload)[action.type];
        }else{
            return state;
        }
    };

export { UseReducer };    
