import React, { useContext, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from "../../../context/themeContext";

const propTypes = {
    onSearch: PropTypes.func.isRequired
};

function Searchbar(props){
    
    const [term, setTerm] = useState('');

    const theme = useContext(ThemeContext);

    const inputRef = useRef();

    const search = () => {
        props.onSearch(term);
    }

    const focusInput = () => {
        inputRef.current.focus();
    }

    useEffect(() => {
        focusInput();
    }, [] );

    return(
            <div className="d-flex">
                <input
                    ref={inputRef}
                    value={term}
                    onKeyDown={e => e.key === 'Enter' && search()}
                    onChange={e => setTerm(e.target.value)}
                    className="form-control"
                    type="text"
                    placeholder="Szukaj..." 
                />
                        <button
                            onClick={search}
                            className={`btn btn-${theme.color} ms-2`}>
                            Szukaj
                        </button> 
            </div>
    );
}

Searchbar.propTypes = propTypes;

export default Searchbar;