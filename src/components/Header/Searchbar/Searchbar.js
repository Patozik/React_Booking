import React from 'react';

function Searchbar(){
    return(
        <div>
            <input
                style={{
                    width: 'calc(100% - 20px)'
                }}
                className="input-text"
                type="text"
                placeholder="Szukaj..." />
            <button className="button">Szukaj</button>
        </div>
    );
}

export default Searchbar;