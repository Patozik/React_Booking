import Hotels from '../../components/Hotels/Hotels';
import { useEffect, useState } from 'react';
import BestHotel from '../../components/Hotels/BestHotel/BestHotel';
import LastHotel from '../../components/Hotels/LastHotel/LastHotel';
import useStateStorage from '../../hooks/useStateStorage';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon';
import axios from '../../axios_database';
import { objectToArrayWithId } from '../../helpers/objects';

export default function Home(props) {

    const [loading, setLoading] = useState(true);
    const [hotels, setHotels] = useState([]);
    
    useWebsiteTitle('Strona główna');

    const getBestHotel = () => {
        if (hotels.length < 2) {
            return null;
        } else {
            return hotels
                .sort((a, b) => a.rating > b.rating ? -1 : 1)[0];
        }
    }

    const [lastHotel, setLastHotel] = useStateStorage('last-hotel', null);

    const openHotel = (hotel) => setLastHotel(hotel);

    const removeLastHotel = () => setLastHotel(null);

    const fetchHotels = async () => {
        try {
            const res = await axios.get('/hotels.json');
            const newHotel = objectToArrayWithId(res.data).filter(hotel => hotel.status == 1);
            setHotels(newHotel);
        } catch (err) {
            console.log(err.response);
        }
        setLoading(false);
    };
    
    useEffect(() => {
        fetchHotels();
    }, []);

    return loading ? <LoadingIcon /> : (
        <>
            {lastHotel ? <LastHotel {...lastHotel} onRemove={removeLastHotel} /> : null}
            {getBestHotel() ? <BestHotel getHotel={getBestHotel} /> : null}
            <Hotels onOpen={openHotel} hotels={hotels} />
        </>
    );
}