import { useRef } from "react";

const InputText = props => {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <input
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                type={props.type}
                className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">
                {props.error}
            </div>
        </div>
    );
}

const InputSelect = props => {
    return (
        <div className="mt-3 form-group">
            <label>{props.label}</label>
            <select
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`} >
                {props.options.map(option =>
                    <option value={option.value} key={option.value}>{option.label}</option>
                )}
            </select>
            <div className="invalid-feedback">
                {props.error}
            </div>
        </div>
    );
}

const InputCheckbox = props => {

    const changeFeatureHandler = e => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            const newValue = [...props.value, value];
            props.onChange(newValue);
        } else {
            const newValue = props.value.filter(x => x !== value);
            props.onChange(newValue);
        }
    };

    return (
        <div className="mt-3 form-group">
            {props.options.map(option => (
                <div className="form-check" key={option.value}>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id={option.value}
                        checked={props.value.find(x => x === option.value) || false}
                        value={option.value}
                        onChange={changeFeatureHandler} />
                    <label className="form-check-label" htmlFor={option.value}>{option.label}</label>
                </div>
            ))}
        </div>
    );
}

const InputFile = props => {
    const fileRef = useRef();
    const changeHandler = (e) => {
        props.onChange(e.target.files[0]);
    }

    return (
        <div className="mt-3 form-group">
            <input
                type="file"
                onChange={changeHandler}
                ref={props.fileRef} />
        </div>
    );
}

const InputRadio = props => {
    return (
        <div className="mt-3 form-group">
            {props.options.map(option => (
                <div className="form-check" key={option.value}>
                    <input
                        className="form-check-input"
                        type="radio"
                        name={props.name}
                        value={option.value}
                        onChange={e => props.onChange(e.target.value)}
                        checked={props.value == option.value}
                        id={`radio-${option.value}-${props.name}`} />
                    <label className="form-check-label" htmlFor={`radio-${option.value}`}>
                        {option.label}
                    </label>
                </div>
            ))}
        </div>
    );
}

const InputTextarea = props => {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <textarea
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                type={props.type}
                className={`form-control ${props.error && props.showError ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">
                {props.error}
            </div>
        </div>
    );
}


function Input(props) {
    switch (props.type) {
        case 'select':
            return <InputSelect {...props} />
        case 'checkbox':
            return <InputCheckbox {...props} />
        case 'file':
            return <InputFile {...props} />
        case 'radio':
            return <InputRadio {...props} />
        case 'textarea':
            return <InputTextarea {...props} />
        default:
            return <InputText {...props} />
    }       
}

Input.defaultProps = {
    type: 'text',
    isValid: false,
    showError: false,
};

export default Input;