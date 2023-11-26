import s from './sidebar.module.css';
import BodySidebar from './BodySidebar';
import React from 'react';

export default function Sidebar({setShowSidebar}) {

    // Borrar todo esto cuando ya el sidebar cierra y abra
    // const [count, setCount] = React.useState(0);

    // React.useEffect(() => {
    //     console.log(count);
    // }, [count])

    const handleOnClickHideSidebar = () => {
        setShowSidebar(false);
    }

    return (
        <div className={s.container}>

            <div className={s.fondo} onClick={handleOnClickHideSidebar}></div>

            <div className={s.bodySidebar}>

                <BodySidebar setShowSidebar={setShowSidebar}/>
            
            </div>
        </div>
    )
}