import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoadingButtons from "../../../components/UI/LoadingButton/LoadingButton";
import axios from "../../../axios";

export default function Login(props) {

    const [auth, setAuth] = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post('accounts:signInWithPassword', {
                email,
                password,
                returnSecureToken: true
            });
            setAuth({
                email: res.data.email,
                token: res.data.idToken,
                userId: res.data.localId,
            });
            navigate('/');
            
        } catch (err) {
            setError(err.response.data.error.message);
            console.log(err.response);
            setLoading(false);
        }

    }

    useEffect(() => {
        if (auth) {
            navigate('/');
        }
    }, []);


    return (
        <div className="container">
            <h2>Logowanie: </h2>

            {error ? (
                <div className="alert alert-danger">{error}</div>
            ) : null }

            <form onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="email-input">Email:</label>
                    <input
                        id="email-input"    
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                        className="form-control" />
                </div>
                <div className="form-group">
                    <label>Hasło:</label>
                    <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="form-control" />
                </div>
                <LoadingButtons loading={loading}>Zaloguj</LoadingButtons>
            </form>
        </div>
    );
}