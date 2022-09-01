import React from 'react';
import styles from './Menu.module.css';

function Menu(props) {
    return (
        <div className={`${styles.menuContainer} container`}>
            <ul className={styles.menu}>
                <li className={styles.menuItem}>
                    <a href="#" className={`btn btn-${props.theme}`}>Home</a>
                </li>
            </ul>
        </div>
    );
}

export default Menu;