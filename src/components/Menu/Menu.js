import React, { useContext } from 'react';
import styles from './Menu.module.css';
import ThemeContext from '../../context/themeContext';
import AuthContex from '../../context/authContext';

function Menu() {
    const auth = useContext(AuthContex);
    const theme = useContext(ThemeContext);

    const login = (e) => {
        e.preventDefault();
        auth.login();
    }

    const logout = (e) => {
        e.preventDefault();
        auth.logout();
    }

    return (
        <div className={`${styles.menuContainer} container`}>
            <ul className={styles.menu}>
                <li className={styles.menuItem}>
                    <a href="#" className={`btn btn-${theme.color}`}>Home</a>
                </li>
                {auth.isAuthenticated
                    ? (
                        <li className={styles.menuItem}>
                            <a href="#" onClick={logout} className={`ms-2 btn btn-${theme.color}`}>Wyloguj</a>
                        </li>
                    )
                    : (
                        <li className={styles.menuItem}>
                            <a href="#" onClick={login} className={`ms-2 btn btn-${theme.color}`}>Zaloguj</a>
                        </li>
                    )    
                }
            </ul>
        </div>
    );
}

export default Menu;