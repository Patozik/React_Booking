import { useEffect, useState } from "react";
import LoadingButtons from "../../../components/UI/LoadingButton/LoadingButton";
import { validateEmail } from "../../../helpers/validations";

export default function ProfileDetails(props) {

    const [email, setEmail] = useState('email@email.com');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            //walidacja

            //zapisywanie

            setLoading(false);
        }, 500);
    }

    useEffect(() => {
        if (validateEmail(email)) {
            setErrors({ ...errors, email: '' });
        } else {
            setErrors({...errors, email: 'Niepoprawny email'});
        }
    }, [email]);

    useEffect(() => {
        if (password.length >= 4 || !password) {
            setErrors({ ...errors, password: '' });
        } else {
            setErrors({ ...errors, password: 'Minimum 4 znaki' });
        }
    }, [password]);

    const buttonDisabled = Object.values(errors).filter(x => x).length || password.length === 0 ;

    return (
        <form onSubmit={submit}>
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