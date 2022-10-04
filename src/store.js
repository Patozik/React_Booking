import { createStore } from 'redux';

const initialState = {
    user: JSON.parse(window.localStorage.getItem('token-data')) ?? null,
    theme: 'primary'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'change-theme':
            const theme = state.theme === 'primary' ? 'warning' : 'primary';
            return { ...state, theme };
        case 'login':
            return { ...state, user: action.user };
        case 'logout':
            return { ...state, user: null };
        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;