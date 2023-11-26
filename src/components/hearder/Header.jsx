import React from "react";
import s from './header.module.css';
import menuImage from '../../../public/menu.png';
import Sidebar from "../sidebar/Sidebar";

export default function Header () {

    const [showSidebar, setShowSidebar] = React.useState(false);

    const handleOnClickMenu = () => {
        setShowSidebar(true);
    }

    return (
        <div className={s.container}>

            <nav className={s.nav}>
                
                <div onClick={handleOnClickMenu}>
                    <img className={s.menuImage} src={menuImage} alt="Imagen del menu" />
                </div>

                <div>
                    <span style={{marginRight: "1rem"}}>Hola Jesuan</span>
                </div>

            </nav>

            {
                showSidebar && <Sidebar setShowSidebar={setShowSidebar} />
            }
            
        </div>
    )
}
