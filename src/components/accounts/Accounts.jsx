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

    // const addDateMap = () => {

    //     var lastDate = '';

    //     return (e) => {

    //         let date = e.date.slice(0, 10).replaceAll('-', '/')
    //         if(lastDate.length == 0){
    //             lastDate = date
    //             return (
    //                 <span>{lastDate}</span>
    //             )
    //         }
    //         if(lastDate !== date){
    //             lastDate = date
    //             return (
    //                 <span>{lastDate}</span>
    //             )
    //         }
    //     }
    // }

    // const clousure = addDateMap();

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
                    <strong className={s.columnEmail}>Email</strong>
                    <strong className={s.column}>estado</strong>
                    <strong className={`${s.column} ${s.hidden}`}>Baneada</strong>
                    <strong className={`${s.column} ${s.hidden}`}>Cobrada</strong>
                </div>

                {
                    accounts.length && accounts.map((e, i, arr) => (
                        <div  key={e.id}>

                            {
                                (i == 0 || arr[i-1].date !== e.date)
                                && 
                                <div className={s.divDate}>
                                    <span>{e.date.slice(0, 10).replaceAll('-', '/')}</span>
                                </div>  
                            }

                            <div className={`${s.row} ${i % 2 !== 0 ? s.row1 : s.row2} ${e.banned && s.rowRed}`} onClick={()=>handleClickAccount(e.id)}>

                                <div className={s.columnEmail} style={{maxWidth: '10rem'}}>
                                    <span>{e.email}</span>
                                </div>

                                <div className={s.column}>{e.state}</div>

                                <div className={`${s.column} ${s.hidden}`}>{e.banned ? 'Sí' : 'no'}</div>

                                <div className={`${s.column} ${s.hidden}`}>{e.cobrada}</div>

                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
