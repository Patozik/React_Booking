import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios_database";
import { objectToArrayWithId } from "../../helpers/objects";
import Hotels from "../../components/Hotels/Hotels";

export default function Serach(props) {
    const [hotels, setHotels] = useState([]);
    const { term } = useParams();

    const search = async () => {
        try {
            const res = await axios.get('/hotels.json');
            const newHotel = objectToArrayWithId(res.data).filter(hotel => hotel.name.includes(term));
            setHotels(newHotel);
        } catch (err) {
            console.log(err.response);
        }
    }

    useEffect(() => {
        search();
    },[term]);
    
    return (
        <div className="container">
            <h2>Wyniki dla frazy "{term}" : </h2>
            <Hotels hotels={hotels} />
        </div>
    );
}