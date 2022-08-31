import React from 'react';
import styles from './Header.module.css';
import Searchbar from './Searchbar/Searchbar';

function Header(props) {
    return (
        <header className={`${styles.header} container`}>
            <Searchbar onSearch={props.onSearch}/>
        </header>
    );
}

export default Header;