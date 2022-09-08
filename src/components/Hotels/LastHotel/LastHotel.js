
function LastHotel(props) {
    return (
        <div className="card bg-light container">
            <div className="card-header">
                Ostatnio oglądałeś ten hotel, nadal zainteresowany ? : 
            </div>
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                    <h5 className="card-title">{props.name}</h5>
                    <span className="badge bg-info text-dark">{props.city}</span>
                </div>
                <div style={{width: '100px'}} className="ms-auto d-flex justify-content-between">
                    <button className="btn btn-sm btn-dark">Tak</button>
                    <button onClick={props.onRemove} className="btn btn-sm btn-dark">Nie</button>
                </div>
            </div>
        </div>
    );
}

export default LastHotel;