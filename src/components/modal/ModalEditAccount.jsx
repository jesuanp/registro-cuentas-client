import React, { useState, useContext, createRef } from 'react';
import s from './modalEditAccount.module.css';
import cuentasContext from '../../context/cuentasContext/cuentasContext';

export default function ModalEditAccount ({userId, type, cobrada, setTypeEditModal}) {

    const selectRef = createRef(null);

    const { updateAccount } = useContext(cuentasContext);

    const [valueSelect, setValueSelect] = useState('')

    const typeStateBody = () => {
        return (
            <div>
                <div className={s.divSelect} style={{margin: '0px 3rem'}}>
                    <label>Estado</label>
                    <select className={s.inputSelect} name="state" id="" defaultValue={"elija una opción"} ref={selectRef} onChange={()=>setValueSelect(selectRef.current.value)}>
                        <option value="elija una opción" disabled>Elija una opción</option>
                        <option value="Por trabajar">Por trabajar</option>
                        <option value="Trabajando">Trabajando</option>
                        <option value="Por cobrar">Por cobrar</option>
                    </select>
                </div>
            </div>
        )
    }

    const [count, setCount] = useState(cobrada || 0)

    const typeCobradaBody = () => {
        return (
            <div className={s.bodyCobrada}>
                <div className={s.divNumberCobrada}>
                    <strong>{count}</strong>
                </div>
                <button onClick={()=>setCount(state => state > 0 ? --state : 0)}>-</button>
                <button onClick={()=>setCount(state => ++state)}>+</button>
            </div>
        )
    }

    const handleSubmit = () => {
        if(type === 'state'){
            updateAccount({id: userId, state: valueSelect})
            setTypeEditModal('')
        }
        else {
            updateAccount({id: userId, cobrada: count})
            setTypeEditModal('')
        }
    }

    return (
        <div className={s.container}>

            <div className={s.modal}>

                <div className={s.head}>

                    <h3>{type == 'state' ? 'Cambiar estado' : 'Agregar un cobro'}</h3>

                </div>
                <hr />

                <div className={s.body}>

                    {
                        type == 'state'
                        ? typeStateBody()
                        : typeCobradaBody()

                    }

                </div>

                <hr />

                
                <div className={s.foot}>
                    <button onClick={()=>setTypeEditModal('')}>cancelar</button>
                    <button onClick={handleSubmit} style={{backgroundColor: '#5AA469'}}>Aceptar</button>
                </div>
            </div>

        </div>
    )
}