import { useEffect, useState, useRef } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const BestHotel = (props) => {
    const [time, setTime] = useState('');

    let endTime = useRef(null);
    endTime = moment().add(30, 'minutes');

    const hotel = props.getHotel();
    let interval = useRef(null);

    useEffect(() => {
        interval.current = setInterval(() => {
            const leftTime = -moment().diff(endTime)/1000;
            const minutes = Math.floor(leftTime / 60);
            const seconds = Math.floor(leftTime % 60);
            setTime(`minuty: ${minutes}, sekundy: ${seconds}`);
        }, 1000);
        return () => {
            clearInterval(interval.current);
        }
    }, []);

    return (
        <div className="mt-2 card bg-success text-white container">
            <div className="card-header">
                Najlepsza oferta !
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">{hotel.name}</h5>
                    <p>Ocena: {hotel.rating}</p>
                </div>
                <p>Do końca oferty pozostało : {time}</p>
                <Link to={`/hotele/${hotel.id}`} className="btn btn-sm btn-dark">Pokaż</Link>
            </div>
        </div>
    );
};

export default BestHotel;