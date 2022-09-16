export const reducer = (state, action) => {
    switch (action.type) {
        case 'change-theme':
            const theme = state.theme === 'primary' ? 'warning' : 'primary';
            return { ...state, theme };
        case 'login':
            return { ...state, user: action.user };
        case 'logout':
            return { ...state, user: null };
        default:
            throw new Error('Nie ma takiej akcji: ' + action.type);
    }
}

export const initialState = {
    user: JSON.parse(window.localStorage.getItem('token-data')) ?? null,
    theme: 'primary'
}