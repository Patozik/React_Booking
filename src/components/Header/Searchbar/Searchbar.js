import React, { useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onSearch: PropTypes.func.isRequired
};

function Searchbar(props){
    
    const [term, setTerm] = useState('');

    const search = () => {
        props.onSearch(term);
    }

    return(
            <div className="d-flex">
                <input
                    value={term}
                    onKeyDown={e => e.key === 'Enter' && search()}
                    onChange={e => setTerm(e.target.value)}
                    className="form-control"
                    type="text"
                    placeholder="Szukaj..." 
                />
            
                <button
                    onClick={search} 
                    className="btn btn-secondary ms-2">
                    Szukaj
                </button>
            </div>
    );
}

Searchbar.propTypes = propTypes;

export default Searchbar;