import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Menu from './Menu';
import AuthContext from '../../context/authContext';

describe('Menu component', () => {
    test('renders Zaloguj if user is null', () => {
        render(<Router><Menu /></Router>);
        const link = screen.getByText(/Zaloguj/i);
        expect(link).toBeInTheDocument();
    });
    test('renders Wyloguj if user exists', () => {
        render(
            <AuthContext.Provider value={{
                user: { email: 'email@test.com' },
                login: () => { },
                logout: () => { },
            }}>
                <Router>
                    <Menu />
                </Router>
            </AuthContext.Provider>
        );
        const link = screen.getByText(/Wyloguj/i);
        expect(link).toBeInTheDocument();
    });
});