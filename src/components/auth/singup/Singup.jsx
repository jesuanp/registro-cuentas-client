import React from "react";
import s from '../signin/signin.module.css';
import { NavLink } from "react-router-dom";

export default function Singup () {

    const [state, setState] = React.useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    });
    const { name, email, password, repeatPassword } = state;

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(name.trim() == '' || email.trim() == '' || password.trim() == '' || repeatPassword.trim() == ''){
            alert('Completar todos los campos');
            return;
        }

        if(password !== repeatPassword){
            alert('Las contraseñas deben ser iguales');
            return;
        }


    }

    return (
        <div className={s.container}>

            <h2>Crear Una Cuenta</h2>

            <form className={s.form} onSubmit={handleSubmit}>

                <div>
                    <label>Nombre:</label>
                    <input name="name" type="text" onChange={handleChange} value={name} placeholder="Tu nombre..." />
                </div>

                <div>
                    <label>Correo:</label>
                    <input name="email" type="email" onChange={handleChange} value={email} placeholder="Tu correo..." />
                </div>

                <div>
                    <label>Contraseña:</label>
                    <input name="password" type="password" onChange={handleChange} value={password} placeholder="Contraseña..." />
                </div>

                <div>
                    <label>Repetir contraseña:</label>
                    <input name="repeatPassword" type="password" onChange={handleChange} value={repeatPassword} placeholder="Repetir contraseña..." />
                </div>

                <div>
                    <button type="submit">Crear Cuenta</button>
                </div>

                <NavLink  className={s.navLink} to='/'>
                    <span>Iniciar Sesión</span>
                </NavLink>

            </form>
            
        </div>
    )
}
