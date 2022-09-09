import Hotels from '../../components/Hotels/Hotels';
import { useEffect, useState } from 'react';
import BestHotel from '../../components/Hotels/BestHotel/BestHotel';
import LastHotel from '../../components/Hotels/LastHotel/LastHotel';
import useStateStorage from '../../hooks/useStateStorage';
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import LoadingIcon from '../../components/UI/LoadingIcon/LoadingIcon';

const backendHotels = [
    {
        id: 1,
        name: 'Pod brzozą',
        city: 'Rzeszów',
        rating: 8.3,
        description: 'Mieszkanie o powierzchni 59,12 m2 (2-poziomowe) zlokalizowane w Rzeszowie ul. Aleja Generała Władysława Sikorskiego. Mieszkanie usytuowane jest na 3 piętrze, 3 piętrowego bloku. Do mieszkania należy komórka lokatorska, duży balkon. Nieruchomość jest w pełni umeblowane, posiada klimatyzacje oraz wyposażone jest w sprzęt AGD.',
        image: ''
    },
    {
        id: 2,
        name: 'Słoneczna',
        city: 'Warszawa',
        rating: 7.3,
        description: 'Mieszkanie o powierzchni 59,12 m2 (2-poziomowe) zlokalizowane w Rzeszowie ul. Aleja Generała Władysława Sikorskiego. Mieszkanie usytuowane jest na 3 piętrze, 3 piętrowego bloku. Do mieszkania należy komórka lokatorska, duży balkon. Nieruchomość jest w pełni umeblowane, posiada klimatyzacje oraz wyposażone jest w sprzęt AGD.',
        image: ''
    }
];

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
    
    useEffect(() => {
        setTimeout(() => {
            setHotels(backendHotels);
            setLoading(false);
        }, 1000);
    }, []);

    return loading ? <LoadingIcon /> : (
        <>
            {lastHotel ? <LastHotel {...lastHotel} onRemove={removeLastHotel} /> : null}
            {getBestHotel() ? <BestHotel getHotel={getBestHotel} /> : null}
            <Hotels onOpen={openHotel} hotels={hotels} />
        </>
    );
}