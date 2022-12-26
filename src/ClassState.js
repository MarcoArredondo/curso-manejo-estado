import React from "react";
import {Loading} from "./Loading";

class ClassState extends React.Component {
  
    constructor(props){
        super(props);
        this.state = {
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
                this.setState({loading:false});
            }, 3000);
            console.log("Terminando actualizacion en class component");
        }
    }

    render () {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor, escribe el código de seguridad</p>
                <input placeholder="Código de seguridad"/>

                {this.state.error && (
                      <p>Error: El código es incorrecto</p>
                )}

                {this.state.loading && (
                    <Loading />
                )}

                <button
                onClick={() => this.setState({loading: true})}>Comprobar</button>
            </div>
        );
    }
}

export { ClassState };