import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../axios_database';
import { objectToArrayWithId } from '../../../helpers/objects';
import useAuth from '../../../hooks/useAuth';

export default function MyHotels(props) {
    const [auth] = useAuth();
    const [hotels, setHotels] = useState([]);

    const fetchHotels = async () => {
        try {
            const res = await axios.get('/hotels.json');
            const newHotel = objectToArrayWithId(res.data).filter(hotel => hotel.user_id === auth.userId);
            setHotels(newHotel);
        } catch (err) {
            console.log(err.response);
        }
    }

    const deleteHandler = async id => {
        try {
            await axios.delete(`/hotels/${id}.json?auth=${auth.token}`);
            setHotels(hotels.filter(x => x.id !== id));
        } catch (err) {
            console.log(err.response);
        }
    };

    useEffect(() => {
        fetchHotels();
    },[]);

    return (
        <div>
            {hotels ? (
                <table className='table'>
                    <thead>
                        <th>Nazwa</th>
                        <th>Opcje</th>
                        <th>Opcje</th>
                    </thead>
                    <tbody>
                       {hotels.map((hotel, index) => (
                           <tr>
                               <td>{hotel.name}</td>
                                <td>
                                    {hotel.status == 1 
                                        ? <span className='badge bg-success'>Aktywny</span> 
                                        : <span className='badge bg-danger'>Nie aktywny</span> 
                                    }
                                </td>
                               <td>
                                   <Link to={`/profil/hotele/edytuj/${hotel.id}`} className="btn btn-warning">Edytuj</Link>
                                   <button onClick={() => deleteHandler(hotel.id)} className="ms-2 btn btn-danger">Usuń</button>
                               </td>
                           </tr>
                       ))}
                    </tbody>
                </table>
            ) : (
                <p>Nie masz jeszcze żadnego hotelu.</p>
            )}
            <Link to="dodaj" className="btn btn-primary">Dodaj hotel</Link>
        </div>
    )
}