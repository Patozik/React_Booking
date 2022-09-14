import React, { useContext } from 'react';
import styles from './Menu.module.css';
import ThemeContext from '../../context/themeContext';
import useAuth from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';

function Menu() {
    
    const [auth, setAuth] = useAuth();

    const theme = useContext(ThemeContext);

    const login = (e) => {
        e.preventDefault();
        // auth.login();
        setAuth(true);
    }

    const logout = (e) => {
        e.preventDefault();
        // auth.logout();
        setAuth(false);
    }

    return (
        <div className={`${styles.menuContainer} card bg-light container`}>
            <ul className={styles.menu}>
                <li className={styles.menuItem}>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'btn btn-info' : `btn btn-${theme.color}`}>
                        Home
                    </NavLink>
                </li>
                {auth
                    ? (
                        <>
                            <li className={styles.menuItem}>
                                <NavLink to="/profil" className={({ isActive }) => isActive ? 'ms-2 btn btn-info' : `ms-2 btn btn-${theme.color}`}>
                                    Mój profil
                                </NavLink>
                            </li>
                            <li className={styles.menuItem}>
                                <a href="#" onClick={logout} className={`ms-2 btn btn-${theme.color}`}>Wyloguj</a>
                            </li>
                        </>
                    )
                    : (
                        <>
                            <li className={styles.menuItem}>
                                <a href="#" onClick={login} className={`ms-2 btn btn-${theme.color}`}>Zaloguj</a>
                            </li>
                            <li className={styles.menuItem}>
                                <NavLink to="/zarejestruj" className={({ isActive }) => isActive ? 'ms-2 btn btn-info' : `ms-2 btn btn-${theme.color}`}>
                                    Zarejestruj
                                </NavLink>
                            </li>
                        </>
                    )    
                }
            </ul>
        </div>
    );
}

export default Menu;