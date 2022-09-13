export default function LoadingButtons(props) {
    const className = props.className || 'btn btn-primary';

    return ( props.loading
            ? (
                <button className={`mt-2 btn ${className}`} type="button" disabled>
                    <span className="me-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span class="sr-only">Ładowanie...</span>
                </button>
            )
            : <button {...props} className={`mt-2 btn ${className}`}>{props.children}</button>
    );
}

