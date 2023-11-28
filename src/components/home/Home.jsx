import React, {useContext, useEffect, useState} from "react";
import s from './home.module.css';
import cuentasContext from '../../context/cuentasContext/cuentasContext';

export default function Home () {

    const {accounts, getAccounts} = useContext(cuentasContext)

    const [totalAccounts, setTotalAccounts] = useState(0)
    const [accountsActive, setAccountActives] = useState(0)
    const [accountsBanned, setAccountBanned] = useState(0)
    const [accountState1, setAccountState1] = useState(0)
    const [accountState2, setAccountState2] = useState(0)
    const [accountState3, setAccountState3] = useState(0)

    useEffect(() => {
        if(accounts && accounts.length){
            setTotalAccounts(accounts.length)
            setAccountActives(accounts.filter(e => !e.banned).length)
            setAccountBanned(accounts.filter(e => e.banned).length)
            setAccountState1(accounts.filter(e => e.state === 'Por trabajar').length)
            setAccountState2(accounts.filter(e => e.state === 'Trabajando').length)
            setAccountState3(accounts.filter(e => e.state === 'Por cobrar').length)

        }

        if(!accounts == false){
            getAccounts();
        }
    }, [])

    return (
        <div className={s.container}>

            <h2>Estadisticas de las cuentas</h2>

            <div className={s.containerTables}>
                <div className={s.table}>

                    <div className={s.row}>
                        <div className={s.property}>
                            <span>Total cuentas</span>
                        </div>
                        <div className={s.numTotal}>
                            <span>{totalAccounts}</span>
                        </div>
                    </div>

                    <div className={s.row}>
                        <div className={s.property}>
                            <span>Baneadas</span>
                        </div>
                        <div className={s.numTotal}>
                            <span>{accountsBanned}</span>
                        </div>
                    </div>

                    <div className={s.row}>
                        <div className={s.property}>
                            <span>Sin banear</span>
                        </div>
                        <div className={s.numTotal}>
                            <span>{accountsActive}</span>
                        </div>
                    </div>
                    
                </div>

                <div className={s.table}>

                <div className={s.row}>
                        <div className={s.property}>
                            <span>Por trabajar</span>
                        </div>
                        <div className={s.numTotal}>
                            <span>{accountState1}</span>
                        </div>
                    </div>

                    <div className={s.row}>
                        <div className={s.property}>
                            <span>Trabajando</span>
                        </div>
                        <div className={s.numTotal}>
                            <span>{accountState2}</span>
                        </div>
                    </div>

                    <div className={s.row}>
                        <div className={s.property}>
                            <span>Por cobrar</span>
                        </div>
                        <div className={s.numTotal}>
                            <span>{accountState3}</span>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}
