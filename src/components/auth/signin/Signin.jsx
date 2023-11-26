import React from "react";
import s from './signin.module.css';
import { NavLink } from "react-router-dom";

export default function Signin () {

    const [state, setState] = React.useState({
        email: '',
        password: '',
    });
    const { email, password} = state;

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(email.trim() == '' || password.trim() == ''){
            alert('Completar todos los campos');
            return;
        }


    }

    return (
        <div className={s.container}>

            <h2>Iniciar Sesión</h2>
            
            <form className={s.form} onSubmit={handleSubmit}>

                <div>
                    <label>Correo:</label>
                    <input name="email" type="email" onChange={handleChange} value={email} placeholder="Tu correo..." />
                </div>

                <div>
                    <label>Contraseña:</label>
                    <input name="password" type="password" onChange={handleChange} value={password} placeholder="Contraseña..." />
                </div>

                <div>
                    <button type="submit">Iniciar Sesión</button>
                </div>

                <NavLink  className={s.navLink} to='/singup'>
                    <span>Crear Una Cuenta</span>
                </NavLink>
                
            </form>


        </div>
    )
}
