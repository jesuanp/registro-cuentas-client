import React, {useContext} from 'react';
import s from './addAccount.module.css';
import cuentasContext from '../../context/cuentasContext/cuentasContext';
import {useNavigate} from 'react-router-dom';

export default function AddAccount () {

    const {addAccount} = useContext(cuentasContext);

    const navigate = useNavigate();

    const [newAccount, setNewAccount] = React.useState({
        email: '',
        date: '',
        state: ''
    });

    const handleChange = e => {
        setNewAccount({
            ...newAccount,
            [e.target.name]: e.target.value
        })
    }

    const {email, date, state} = newAccount;
    
    const handleSubmit = e => {
        e.preventDefault();

        if(email.trim() == '' || date.trim() == '' || state.trim() == ''){
            return console.log('Faltan parametros');
        }

        addAccount(newAccount);

        navigate('/accounts')
    }

    return (
        <div className={s.container}>

            <div className={s.divTitle}>
                <h2>Agregar una cuenta</h2>
            </div>

            <form className={s.form} onSubmit={handleSubmit}>

                <div className={s.divInput}>
                    <label>Email</label>
                    <input className={s.inputSelect} type="email" name="email" placeholder='Email...' onChange={handleChange} />
                </div>

                <div className={s.containerDivInput}>
                    <div className={s.divInput}>
                        <label>Creada</label>
                        <input className={s.inputSelect} type="date" name="date" onChange={handleChange} />
                    </div>

                    <div className={s.divInput}>
                        <label>Estado</label>
                        <select className={s.inputSelect} name="state" id="" defaultValue={"elija una opción"} onChange={handleChange} >
                            <option value="elija una opción" disabled>Elija una opción</option>
                            <option value="Activa">Activa</option>
                            <option value="Trabajando">Trabajando</option>
                            <option value="Por cobrar">Por cobrar</option>
                        </select>
                    </div>
                </div>

                <div className={s.divButtonSubmit}>
                    <button>Agregar</button>
                </div>

            </form>
        </div>
    )
}