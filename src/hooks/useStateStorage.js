import { useState } from "react";

function useStateStorage(key, defaultValue) {
    let value;
    const [state, setState] = useState(defaultValue);

    const storageValue = window.localStorage.getItem(key);
    if (storageValue) {
        value = JSON.parse(storageValue);
    } else {
        value = state;
    }

    const setValue = val => {
        setState(val);
        window.localStorage.setItem(key , JSON.stringify(val));
    }

    return [value, setValue];
}

export default useStateStorage;