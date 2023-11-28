import s from './sidebar.module.css';
import {NavLink} from 'react-router-dom';

export default function BodySidebar ({setShowSidebar}) {

    const handleClick = () => {
        setShowSidebar(false);
    }
    
    return (
        <ul className={s.ulSidebar}>
            <NavLink className={s.navLink} to={'/'} onClick={handleClick}>
                <li className={s.liSidebar}>
                    Estadisticas
                </li>
            </NavLink>

            <NavLink className={s.navLink} to={'/accounts'} onClick={handleClick}>
                <li className={s.liSidebar}>
                    Cuentas
                </li>
            </NavLink>

            <li className={s.liSidebar} onClick={handleClick} >Páginas</li>
        </ul>
    )
}