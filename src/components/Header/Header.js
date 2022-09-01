import React from 'react';
import styles from './Header.module.css';

function Header(props) {
    return (
        <header className={`${styles.header} container`}>
            {props.children}
        </header>
    );
}

export default Header;