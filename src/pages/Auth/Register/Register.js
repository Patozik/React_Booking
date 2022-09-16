import { useEffect, useState } from "react";
import LoadingButtons from "../../../components/UI/LoadingButton/LoadingButton";
import { validate } from "../../../helpers/validations";
import Input from "../../../components/Input/Input";
import axios from "../../../axios";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register(props) {
    const [auth, setAuth] = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    
    const [form, setForm] = useState({
        email: {
            value: '',
            valid: true,
            error: '',
            showError: false,
            rules: ['required', 'email']
        },
        password: {
            value: '',
            valid: true,
            error: '',
            showError: false,
            rules: ['required']
        },
    });

    const valid = !Object.values(form)
        .map(input => input.error)
        .filter(error => error)
        .length && (form.email.value && form.password.value) ? true : false;

    const submit = async e => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post('accounts:signUp', {
                email: form.email.value,
                password: form.password.value,
                returnSecureToken: true
            });

            setAuth({
                email: res.data.email,
                token: res.data.idToken,
                userId: res.data.localId,
            });
            navigate('/');
        } catch (err) {
            console.log(err.response);
            setError(err.response.data.error.message);
            setLoading(false);
        }
        
    };

    const changeHandler = (value, fieldName) => {
        const error = validate(form[fieldName].rules, value);
        setForm({
            ...form,
            [fieldName]: {
                ...form[fieldName],
                value,
                showError: true,
                error: error
            }
        });
    }

    useEffect(() => {
        if (auth) {
            navigate('/');
        }
    },[]);

    
    return (
        <div className="card container">
            <div className="card-header">Rejestracja</div>
            <div className="card-body">

                <p className="text-muted">Uzupełnij dane</p>

                <form onSubmit={submit}>

                    <Input
                        label="Email"
                        type="email"
                        value={form.email.value}
                        onChange={val => changeHandler(val, 'email')}
                        error={form.email.error}
                        showError={form.email.showError} />

                    <Input
                        label="Hasło"
                        type="password"
                        value={form.password.value}
                        onChange={val => changeHandler(val, 'password')}
                        error={form.password.error}
                        showError={form.password.showError} />

                    {error ? (
                        <div className="mt-3 alert alert-danger">{error}</div>
                    ) : null}

                    <div className="text-end">
                        <LoadingButtons
                            disabled={!valid}
                            loading={loading}
                            className="btn-success">
                                Zarejestruj !
                        </LoadingButtons>
                    </div>

                </form>
            </div>
        </div>
    );
}