import React from 'react';
import styles from './Header.module.css';
import Searchbar from './Searchbar/Searchbar';

function Header() {
    return (
        <header className={styles.header}>
            <Searchbar />
        </header>
    );
}

export default Header;