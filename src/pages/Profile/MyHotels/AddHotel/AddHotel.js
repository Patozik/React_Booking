import { useState } from "react";
import LoadingButtons from "../../../../components/UI/LoadingButton/LoadingButton";
import Input from "../../../../components/Input/Input";

const AddHotel = props => {

    const [form, setForm] = useState({
        name: '',
        description: '',
        city: '',
        rooms: 1,
        features: [],
        image: null,
        status: 0,
    });

    const [loading, setLoading] = useState(false);

    const submit = e => {
        e.preventDefault();
        setLoading(true);
        
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    return(
        <div className="card">
            <div className="card-header">Nowy hotel</div>
            <div className="card-body">

                <p className="text-muted">Uzupełnij dane hotelu</p>

                <form onSubmit={submit}>
                
                    <Input
                        label="Nazwa"
                        value={form.name}
                        onChange={value => setForm({ ...form, name: value })}
                        error=""
                        showError={false} />

                    <Input
                        label="Opis"
                        value={form.description}
                        type="textarea"
                        onChange={value => setForm({ ...form, description: value })}
                        error=""
                        showError={false} />

                    <Input
                        label="Miejscowość"
                        value={form.city}
                        onChange={value => setForm({ ...form, city: value })}
                        error=""
                        showError={false} />

                    <Input
                        label="Ilość pokoi"
                        value={form.rooms}
                        type="select"
                        onChange={value => setForm({ ...form, rooms: value })}
                        options={[
                            { value: 1, label: 1 },
                            { value: 2, label: 2 },
                            { value: 3, label: 3 },
                            { value: 4, label: 4 },
                        ]}
                        error=""
                        showError={false} />
                    
                    <h5 className="mt-3">Udogodnienia</h5>
                    <Input
                        value={form.features}
                        type="checkbox"
                        onChange={value => setForm({ ...form, features: value })}
                        options={[
                            { value: 'tv', label: 'TV' },
                            { value: 'wifi', label: 'WiFi' },
                            { value: 'parking', label: 'Parking' },
                        ]}
                        error=""
                        showError={false} />

                    <h5 className="mt-3">Zdjęcie</h5>
                    <div className="mt-3 form-group">
                        <Input 
                            type="file"
                            onChange={value => setForm({ ...form, image: value })} />
                    </div>

                    <h5 className="mt-3">Status</h5>
                    <Input
                        value={form.status}
                        name="status"
                        type="radio"
                        onChange={value => setForm({ ...form, status: value })}
                        options={[
                            { value: '1', label: 'Aktywny' },
                            { value: '0', label: 'Ukryty' },
                        ]}
                        error=""
                        showError={false} />

                    <div className="text-end">
                        <LoadingButtons
                            loading={loading}
                            className="btn-success">
                            Dodaj hotel
                        </LoadingButtons>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default AddHotel;