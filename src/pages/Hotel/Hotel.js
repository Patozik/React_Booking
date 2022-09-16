import { useEffect, useState } from "react";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import axios from "../../axios_database";
import { useParams, useNavigate } from "react-router-dom";
import img from '../../assets/images/hotel.jpg';
import useAuth from "../../hooks/useAuth";

function Hotel(props) {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(5);
    const navigate = useNavigate();
    const [auth] = useAuth();

    const setTitle = useWebsiteTitle();
    
    const fetchHotel = async () => {
        try {
            const res = await axios.get(`/hotels/${id}.json`);
            setHotel(res.data);
            setTitle(`Hotel - ${res.data.name}`);
        } catch (err) {
            console.log(err.response);
        } 
        setLoading(false);
    }

    const rateHotel = async () => {
        try {
            await axios.put(`/hotels/${id}/rating.json?auth=${auth.token}`, rating);
            navigate('/');
        } catch (err) {
            console.log(err.response);
        }
    }
    
    useEffect(() => {
            fetchHotel();
    }, []);

    return loading ? <LoadingIcon /> : (
        <div className="card container">
            <div className="card-header">
                <h1>Hotel: {hotel.name}</h1>
            </div>
            <div className="card-body">
                <img
                    src={img}
                    alt=""
                    className="img-fluid img-thumbnail mb-4" />

                <p>Miejscowość: <b>{hotel.city}</b></p>
                <p>Miejsca: <b>{hotel.rooms}</b></p>
                <p className="lead">{hotel.description}</p>
                <p>Wyposażenie:</p>
                <ul>
                    {hotel.features.map(item =>
                        <li key={item}>{item}</li>
                    )}
                </ul>
                <h4>Ocena: {hotel.rating ?? 'brak ocen'}</h4>
            </div>
            <div className="card-footer">
                {auth ? (
                    <div className="form-group row mt-4">
                        <div className="col">
                            <select
                                value={rating}
                                onChange={e => setRating(e.target.value)}
                                className="form-control form-select-lg mb-3">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="col">
                            <button className="btn btn-info" onClick={rateHotel}>Oceń</button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default Hotel;