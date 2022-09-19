import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import axios from '../../../axios';

jest.mock('axios', () => {
    return {
        create: () => {
            return {
                post: jest.fn(() => Promise.resolve('')),
                get: jest.fn(() => Promise.resolve('')),
            }
        }
    }
});

test('renders Logowanie', () => {
    render(<Router><Login /></Router>);
    expect(screen.getByText(/logowanie/i)).toBeInTheDocument();
});

test('changes email value', () => {
    const utils = render(<Router><Login /></Router>);
    const emailInput = utils.getByLabelText('Email:');

    fireEvent.change(emailInput, { target: { value: 'patryk'} });
    expect(emailInput.value).toBe('patryk');
});

test('show error on fail login', async () => {
    axios.post.mockImplementation(() =>
        Promise.reject({ response: { data: { error: { message: 'Błędne dane' } } } })
    );

    const utils = render(<Router><Login /></Router>);
    const submitButton = utils.getByText('Zaloguj');

    fireEvent.click(submitButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(screen.getByText('Błędne dane')).toBeInTheDocument();
});