import React, { useContext, useEffect, useState, useRef } from 'react';
import ThemeContext from "../../../context/themeContext";
import { useNavigate } from 'react-router-dom';

function Searchbar(props){
    
    const [term, setTerm] = useState('');
    const theme = useContext(ThemeContext);
    const inputRef = useRef();
    const navigate = useNavigate();

    const search = () => {
        // props.onSearch(term);
        navigate(`/wyszukaj/${term}`);
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

export default Searchbar;