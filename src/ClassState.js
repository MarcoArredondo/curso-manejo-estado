import React from "react";
import {Loading} from "./Loading";

const SECURITY_CODE = "paradigma";

class ClassState extends React.Component {
  
    constructor(props){
        super(props);
        this.state = {
            value: "",
            error: false,
            loading: false,
        }
    }

    // UNSAFE_componentWillMount(){
    //     console.log("componentWillMount");
    // }

    // componentDidMount(){
    //     console.log("componentDidMount");
    // }

    componentDidUpdate(){
        console.log("Actualizacion");
        if(this.state.loading){
            console.log("Haciendo actualizacion en class component");
            setTimeout(()=>{
                if(this.state.value === SECURITY_CODE){
                    this.setState({error: false, loading: false});
                }else{
                    this.setState({error: true, loading: false});
                }
            }, 3000);
            console.log("Terminando actualizacion en class component");
        }
    }

    render () {
        const {value, error, loading} = this.state;

        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escribe el código de seguridad</p>
                <input 
                    value={value}
                    placeholder="Código de seguridad"
                    onChange={(event) => {
                        this.setState({value: event.target.value});
                    }}
                />

                {(error && !loading) && (
                      <p>Error: El código es incorrecto</p>
                )}

                {loading && (
                    <Loading />
                )}

                <button
                    onClick={() => this.setState({loading: true})}
                >Comprobar</button>
            </div>
        );
    }
}

export { ClassState };