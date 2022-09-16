import Input from "../../../components/Input/Input";
import { validate } from "../../../helpers/validations";
import useAuth from "../../../hooks/useAuth";
import LoadingButtons from "../../../components/UI/LoadingButton/LoadingButton";
import { useEffect, useState } from "react";

const HotelForm = props => {
    const [auth] = useAuth();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: {
            value: '',
            error: '',
            showError: false,
            rules: ['required', { rule: 'min', length: 4 }]
        },
        description: {
            value: '',
            error: '',
            showError: false,
            rules: ['required', { rule: 'min', length: 10 }]
        },
        city: {
            value: '',
            error: '',
            showError: false,
            rules: ['required']
        },
        rooms: {
            value: 1,
            error: '',
            showError: false,
            rules: ['required']
        },
        features: {
            value: [],
            error: '',
            showError: false
        },
        image: {
            value: [],
            error: '',
            showError: false
        },
        status: {
            value: 0,
            error: '',
            showError: false,
            rules: ['required']
        },
    });

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

    const submit = async e => {
        e.preventDefault();
        setLoading(true);

        try {
            props.onSubmit({
                name: form.name.value,
                description: form.description.value,
                city: form.city.value,
                rooms: form.rooms.value,
                features: form.features.value,
                status: form.status.value,
                user_id: auth.userId
            });
        } catch (err) {
            console.log(err.response);
        }

        setLoading(false);
    };

    useEffect(() => {
        const newForm = { ...form };
        for (const key in props.hotel) {
            newForm[key].value = props.hotel[key];
        }
        setForm(newForm);
    }, [props.hotel]);

    const valid = !Object.values(form)
        .map(input => input.error)
        .filter(error => error)
        .length && (form.name.value && form.description.value && form.city.value) ? true : false;

    return (
        <form onSubmit={submit}>
            <Input
                label="Nazwa"
                value={form.name.value}
                onChange={val => changeHandler(val, 'name')}
                error={form.name.error}
                showError={form.name.showError} />

            <Input
                label="Opis"
                value={form.description.value}
                type="textarea"
                onChange={val => changeHandler(val, 'description')}
                error={form.description.error}
                showError={form.description.showError} />

            <Input
                label="Miejscowość"
                value={form.city.value}
                onChange={val => changeHandler(val, 'city')}
                error={form.city.error}
                showError={form.city.showError} />

            <Input
                label="Ilość pokoi"
                value={form.rooms.value}
                type="select"
                onChange={val => changeHandler(val, 'rooms')}
                options={[
                    { value: 1, label: 1 },
                    { value: 2, label: 2 },
                    { value: 3, label: 3 },
                    { value: 4, label: 4 },
                ]}
                error={form.rooms.error}
                showError={form.rooms.showError} />

            <h5 className="mt-3">Udogodnienia</h5>
            <Input
                value={form.features.value}
                type="checkbox"
                onChange={val => changeHandler(val, 'features')}
                options={[
                    { value: 'tv', label: 'TV' },
                    { value: 'wifi', label: 'WiFi' },
                    { value: 'parking', label: 'Parking' },
                ]}
                error={form.features.error}
                showError={form.features.showError} />

            <h5 className="mt-3">Zdjęcie</h5>
            <div className="mt-3 form-group">
                <Input
                    type="file"
                    onChange={val => changeHandler(val, 'image')} />
            </div>

            <h5 className="mt-3">Status</h5>
            <Input
                value={form.status.value}
                name="status"
                type="radio"
                onChange={val => changeHandler(val, 'status')}
                options={[
                    { value: '1', label: 'Aktywny' },
                    { value: '0', label: 'Ukryty' },
                ]}
                error={form.status.error}
                showError={form.status.showError} />
        
            <div className="text-end">
                <LoadingButtons
                    disabled={!valid}
                    loading={loading}
                    className="btn-success">
                    {props.buttonText}
                </LoadingButtons>
            </div>

        </form>
    );
}

export default HotelForm;