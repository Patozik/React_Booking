import { useEffect, useState } from "react";
import LoadingButtons from "../../../components/UI/LoadingButton/LoadingButton";
import { validateEmail } from "../../../helpers/validations";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../axios";

export default function ProfileDetails(props) {

    const [auth, setAuth] = useAuth();
    const [email, setEmail] = useState(auth.email);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                idToken: auth.token,
                email: email,
                returnSecureToken: true
            };
            if (password) {
                data.password = password;
            }

            const res = await axios.post('accounts:update', data);

            setAuth({
                email: res.data.email,
                token: res.data.idToken,
                userId: res.data.localId,
            });

            setSuccess(true);

            console.log(res);
        } catch (err) {
            console.log(err.response);
        }

        setLoading(false);
    }

    useEffect(() => {
        if (validateEmail(email)) {
            setErrors({ ...errors, email: '' });
        } else {
            setErrors({...errors, email: 'Niepoprawny email'});
        }
    }, [email]);

    // useEffect(() => {
    //     if (password.length >= 4 || !password) {
    //         setErrors({ ...errors, password: '' });
    //     } else {
    //         setErrors({ ...errors, password: 'Minimum 4 znaki' });
    //     }
    // }, [password]);

    const buttonDisabled = Object.values(errors).filter(x => x).length; //|| password.length === 0 ;

    return (
        <form onSubmit={submit}>

            {success ? (
                <div className="alert alert-success">Dane zapisane</div>
            ) : null}

            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={`form-control ${errors.email ? 'is-invalid' : 'is-valid'}`} />
                <div className="invalid-feedback">
                    {errors.email}
                </div>
                <div className="valid-feedback">
                    Email prawidłowy
                </div>
            </div>
            <div className="form-group">
                <label>Hasło:</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">
                    {errors.password}
                </div>
            </div>
            <LoadingButtons 
                loading={loading}
                disabled={buttonDisabled}>Zapisz</LoadingButtons>
        </form>
    )
}