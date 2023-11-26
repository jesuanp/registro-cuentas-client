import s from './modal.module.css';

export default function Modal ({head, body, styles, action}) {

    const handleClick = value => {
        action(value)
    }

    return (
        <div className={s.container}>

            <div style={styles} className={s.modal}>

                {
                    head && 
                    <>
                        <div className={s.head}>

                            <h3>{head}</h3>

                        </div>
                        <hr />
                    </>
                }

                <div className={s.body}>
                    <strong>{body}</strong>

                </div>

                <hr />

                
                <div className={s.foot}>
                    <button onClick={()=>handleClick(false)}>cancelar</button>
                    <button onClick={()=>handleClick(true)} style={{backgroundColor: '#5AA469'}}>Aceptar</button>
                </div>
            </div>

        </div>
    )
}