import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({name}){

    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState('');

    React.useEffect(() => {
        console.log("Empezando el efecto");
        if(loading){
            setError(false);
            setTimeout(() => {
                console.log("Haciendo validacion");
                if(value !== SECURITY_CODE){
                    setError(true);
                }
                setLoading(false);
                console.log("Terminando validacion");
            }, 3000);
        }        
        console.log("Terminando el efecto");
    }, [loading]);

    console.log(value);
    return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor, escribe el código de seguridad</p>

            {error && (
                <p>Error: El código es incorrecto</p>
            )}

            {loading && (
                <p>Cargando...</p>
            )}

            <input 
                onChange={(event) => {
                    setValue(event.target.value);
                }} 
                value={value} 
                placeholder="Código de seguridad"/>
            <button
                onClick={() => setLoading(true)}>Comprobar</button>
        </div>
    );
}

export { UseState };