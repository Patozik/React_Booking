export default function LoadingButtons(props) {
    const className = props.className || 'btn btn-primary';
    const empty = props.empty;

    const buttonProps = {...props};
    delete buttonProps.loading;

    return ( props.loading
            ? (
                <button className={`mt-2 btn ${className}`} type="button" disabled>
                    <span className="me-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="sr-only">Ładowanie...</span>
                </button>
            )
            : <button {...buttonProps} className={`mt-2 btn ${className} ${empty}`} >{props.children}</button>
    );
}

