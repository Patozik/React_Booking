export default function Login(props) {
    return (
        <div className="container">
            <h2>Logowanie: </h2>
            <form>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Hasło:</label>
                    <input type="password" placeholder="*******" className="form-control" />
                </div>
                <button className="mt-2 btn btn-primary">Zaloguj</button>
            </form>
        </div>
    );
}