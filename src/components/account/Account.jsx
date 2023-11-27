import React, {useContext, useEffect, useState, createRef} from "react";
import cuentasContext from "../../context/cuentasContext/cuentasContext";
import s from './account.module.css';
import {useParams, useNavigate} from 'react-router-dom';
import Modal from "../modal/Modal";
import ModalEditAccount from "../modal/ModalEditAccount";

export default function Account () {

    const {id} = useParams();
    const navigate = useNavigate();

    const emailRef = createRef();

    const { account, getAccountById, updateAccount, deleteAccount } = useContext(cuentasContext);

    const infoCreated = (account) => {
        let date = account.date
        let mes = date?.slice(5, 7)
        let dia = date?.slice(8, 10)

        let infoDate = '';

        if(mes == '01') infoDate = `Esta cuenta se creó el ${dia} de enero`
        if(mes == '02') infoDate = `Esta cuenta se creó el ${dia} de febrero`
        if(mes == '03') infoDate = `Esta cuenta se creó el ${dia} de marzo`
        if(mes == '04') infoDate = `Esta cuenta se creó el ${dia} de abril`
        if(mes == '05') infoDate = `Esta cuenta se creó el ${dia} de mayo`
        if(mes == '06') infoDate = `Esta cuenta se creó el ${dia} de junio`
        if(mes == '07') infoDate = `Esta cuenta se creó el ${dia} de julio`
        if(mes == '08') infoDate = `Esta cuenta se creó el ${dia} de agosto`
        if(mes == '09') infoDate = `Esta cuenta se creó el ${dia} de septiembre`
        if(mes == '10') infoDate = `Esta cuenta se creó el ${dia} de octubre`
        if(mes == '11') infoDate = `Esta cuenta se creó el ${dia} de noviembre`
        if(mes == '12') infoDate = `Esta cuenta se creó el ${dia} de diciembre`
        
        return infoDate;
    }

    const [showModal, setShowModal] = useState(false);
    const [modalDeleteAccount, setModalDeleteAccount] = useState(false);
    
    const [typeEditModal, setTypeEditModal] = useState('');

    const [inputPassword, setInputPassword] = useState('');

    const [inputEmail, setInputEmail] = useState('');
    
    const handleChange = e => {
        console.log(e.target.name)
        if(e.target.name === 'email')
            setInputEmail(e.target.value)
        if(e.target.name === 'password')
            setInputPassword(e.target.value)
    }

    const [edit, setEdit] = useState({
        email: false,
        state: false,
        cobrada: false,
        password: false
    });
    // esta funcion es para ver que dato se va a editar
    const handleClickEdit = name => {
        if(name === 'email'){
            setInputEmail(account.email)
            setEdit({
                ...edit,
                [name]: !edit[name]
            })
        }
        else if(name === 'password'){
            setInputPassword(account.password)
            setEdit({
                ...edit,
                [name]: !edit[name]
            })
        }
    }

    const handleSubmit = () => {
        if(inputEmail.trim() !== '') {
            updateAccount({id: account.id, email: inputEmail})
            handleClickEdit('email')
            setInputEmail('')
        }
        else if(inputPassword.trim() !== '') {
            updateAccount({id: account.id, password: inputPassword})
            handleClickEdit('password')
            setInputPassword('')
        }
    }
    
    const handleSubmitModal = response => {
        
        if(response){
            updateAccount({id: account.id, banned: !account.banned})
        }
        setShowModal(false)
    }

    const handleSubmitDeleteAccount = response => {
        if(response){
            deleteAccount(account.id)
            navigate('/accounts')
        }
        setModalDeleteAccount(false)
    }

    useEffect(() => {
        if(Object.keys(account).length === 0){
            getAccountById(id)
        }
    }, [account])

    if( Object.keys(account).length === 0) {
        return (
            <h1 className={s.h1Title}>No existe esta cuenta</h1>
        )
    }

    return (
        <div className={s.container}>
            <div className={s.divInfo}>
                
                <div className={s.divSpanBanned}>
                    <strong className={`${account && account.banned ? s.spanRed : s.spanGreen}`}>{account && account.banned ? 'Cuenta bloqueada' : 'Esta cuenta sigue activa'}</strong>
                </div>
                
                <div className={s.divCobradaState}>
                    <div onClick={()=>setTypeEditModal('state')}>
                        <span>Estado</span>
                        <span className={s.valueCobradaState}>{account && account.state}</span>
                    </div>

                    <div className={s.divCobrada}  onClick={()=>setTypeEditModal('cobrada')}>
                        <span>Cobrada</span>
                        <span className={s.valueCobradaState}>{account && account.cobrada}</span>
                    </div>
                </div>
                
                <div className={s.divEmail}>
                    <span>Email</span>

                    <div className={s.divEmailButton}>
                        {
                            edit.email
                            ? <><input className={s.inputEmail} ref={emailRef} type="email" name="email" value={inputEmail} onChange={handleChange} />
                                <button onClick={handleSubmit} style={{backgroundColor: '#5AA469'}}>update</button></>
                            
                            : <><span className={s.spanEmail}>{account && account.email}</span>
                                    <button onClick={()=>handleClickEdit('email')}>edit</button></>
                        
                        }
                    </div>
                    
                </div>

                <div className={s.divEmail} style={{marginTop: '1rem'}}>
                    <span>Contraseña</span>

                    <div className={s.divEmailButton}>
                        {
                            edit.password
                            ? <><input className={s.inputEmail} type="text" name="password" value={inputPassword} onChange={handleChange} />
                                <button onClick={handleSubmit} style={{backgroundColor: '#5AA469'}}>update</button></>
                            
                            : <><span className={s.spanEmail}>{account && account.password}</span>
                                    <button onClick={()=>handleClickEdit('password')}>edit</button></>
                        
                        }
                    </div>
                    
                </div>
                
                <div className={s.divDate}>
                    <span>{account && infoCreated(account)}</span>
                </div>

                <div className={s.divButtonBanned}>
                    <button onClick={()=>setShowModal(true)}>{account.banned ? 'Quitar ban' : '¿Banearon la cuenta?'}</button>
                </div>

                <div  className={s.divButtonBanned}>
                    <button style={{padding: '0.6rem 0.6rem 0.3rem 0.6rem'}} onClick={()=>setModalDeleteAccount(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>
                    </button>
                </div>
                
            </div>

            {
                modalDeleteAccount &&
                <Modal
                    action={handleSubmitDeleteAccount}
                    body={'¿Seguro que quieres eliminar esta cuenta?'}
                />
            }

            {
                showModal &&
                <Modal
                    action={handleSubmitModal}
                    body={account.banned ? '¿Quieres quitar el ban de la cuenta?' : '¿Queres poner esta cuenta como baneada?'}
                />
            }

            {
                typeEditModal !== '' &&
                <ModalEditAccount
                    userId={account.id}
                    type={typeEditModal}
                    cobrada={account.cobrada}
                    setTypeEditModal={setTypeEditModal}
                />
            }
        </div>
    )
}
