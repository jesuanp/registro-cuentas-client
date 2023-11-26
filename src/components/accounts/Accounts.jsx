import React, {useContext, useEffect} from "react";
import s from './accounts.module.css';
import cuentasContext from "../../context/cuentasContext/cuentasContext";
import {NavLink, useNavigate} from 'react-router-dom';

export default function Accounts () {

    const navigate = useNavigate();

    const {accounts, getAccounts, getAccountById} = useContext(cuentasContext);

    const handleClickAccount = (id) => {
        getAccountById(id);
        navigate(`/account/${id}`);
    }

    useEffect(() => {
        if(!accounts == false){
            getAccounts();
        }
    }, [])

    return (
        <div className={s.container}>

            <div className={s.divButtonAddAccount}>
                <NavLink className={s.navLink} to={'/add-account'}>
                    <button>AGREGAR UNA CUENTA</button>
                </NavLink>
            </div>

            <div className={s.table}>

                <div className={`${s.row} ${s.thead}`} style={{color: '#fff', cursor: 'auto'}} >
                    <strong className={s.column}>Creada</strong>
                    <strong className={s.columnEmail}>Email</strong>
                    <strong className={`${s.column} ${s.hidden}`}>Baneada</strong>
                    <strong className={`${s.column} ${s.hidden}`}>Cobrada</strong>
                    <strong className={`${s.column} ${s.hidden}`}>estado</strong>
                </div>

                {
                    accounts.length && accounts.map((e, i) => (
                        <div className={`${s.row} ${i % 2 !== 0 ? s.row1 : s.row2} ${e.banned && s.rowRed}`} onClick={()=>handleClickAccount(e.id)} key={e.id}>

                            <div className={s.column} >{e.date.slice(0, 10).replaceAll('-', '/')}</div>

                            <div className={s.columnEmail} style={{maxWidth: '10rem'}}>
                                <span>{e.email}</span>
                            </div>

                            <div className={`${s.column} ${s.hidden}`}>{e.banned ? 'Sí' : 'no'}</div>

                            <div className={`${s.column} ${s.hidden}`}>{e.cobrada}</div>

                            <div className={`${s.column} ${s.hidden}`}>{e.state}</div>

                        </div>
                    ))
                }
            </div>

        </div>
    )
}
