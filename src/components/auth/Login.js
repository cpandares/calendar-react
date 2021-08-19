import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { authStartRegister, startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

const Login = () => {

    const dispatch = useDispatch();
       
    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        lEmail:'cesar@cesar.com',
        lPassword:'12345'
    });

    const [ formRegisterValues, handleRegisterInputChange ] = useForm( {
        rName:'enrique',
        rEmail:'enrique@cesar.com',
        rPassword:'12345',
        rPassword2:'12345'
    });


    const { lEmail,lPassword } = formLoginValues;

    const {  rName, rEmail, rPassword, rPassword2 } = formRegisterValues;
    
    const handleLoginSubmit = (e)=>{
        e.preventDefault();
       
        dispatch( startLogin(lEmail,lPassword) );
    }

    const handleRegisterSubmit = (e)=>{
        e.preventDefault();

        if(rPassword2 !== rPassword){
            return Swal.fire('Error','Password no match','error');
        }

        dispatch( authStartRegister( rName, rEmail, rPassword ) );

        
    }

  

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={  handleLoginSubmit }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name = "lEmail"
                                value = { lEmail }
                                onChange = { handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name = "lPassword"
                                value = { lPassword }
                                onChange = { handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit = {  handleRegisterSubmit }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name = "rName"
                                value={ rName }
                                onChange = { handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name = "rEmail"
                                value={ rEmail }
                                onChange = { handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name = "rPassword"
                                value={ rPassword }
                                onChange = { handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name = "rPassword2"
                                value={ rPassword2 }
                                onChange = { handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;