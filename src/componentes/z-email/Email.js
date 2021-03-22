import React, { Component } from "react";
import axios from "axios";
import { API_ROOT } from '../../API/api-config';
import  './email.css'

class Email extends Component {

state = {
  email: "",
  asunto: "",
  mensaje: "",
  sent: false
};

handleEmail=(e)=>{
    this.setState({
        email:e.target.value
    })
}
handleAsunto=(e)=>{
    this.setState({
        asunto:e.target.value
    })
}
handleMensaje=(e)=>{
    this.setState({
        mensaje:e.target.value
    })
}

constructor() {
    super();
    this.enviarEmail = this.enviarEmail.bind(this);
}

 async enviarEmail (e) {
    e.preventDefault();
  
   let data = {
       email:this.state.email,
       asunto:this.state.asunto,
       mensaje:this.state.mensaje
   }
    
    
     await axios.post(`${API_ROOT}/api/form`, {data})
            .then( res => {
                this.setState({
                    sent:true
                },this.resetForm())
            }).catch(()=>{
                console.log('mensaje no enviado')
            })
}

// Resetear formulario email
resetForm=()=>{
    this.setState({
        email:'',
        asunto:'',
        mensaje:''
    })

    setTimeout(()=>{
        this.setState({
            sent: false,
        })
    },3000)
}

render(){
    return(
        <div className="container">
            
            <form className="form" onSubmit={this.enviarEmail}>
            <h1> Enviando correo </h1>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleEmail}
                    required                
                />
            </div>

            <div>
                <label htmlFor="asunto">Asunto</label>
                <input
                    className="form-control"
                    type="text"
                    name="asunto"
                    value={this.state.asunto}
                    onChange={this.handleAsunto}                         
                />
            </div>

            <div>
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                    className="form-control"
                    rows="4"
                    name="mensaje"
                    value={this.state.mensaje}
                    onChange={this.handleMensaje}                           
                > 
                </textarea>
            </div>

            <div className={this.state.sent ? 'msg msgAppear' : 'msg'}>
                El mensaje ha sido enviado
            </div>

            <div>
                <br/>
                <button type="submit" className="btn btn-primary">
                    Enviar email
                </button>
            </div>

            </form>

        </div>
    )
}
}

export default Email;