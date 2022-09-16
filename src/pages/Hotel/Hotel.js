import { useEffect, useState } from "react";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";

function Hotel(props) {
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);

    const setTitle = useWebsiteTitle();
    
    const fetchHotel = () => {
        setHotel({
            id: 2,
            name: 'Słoneczna',
            city: 'Warszawa',
            rating: 7.3,
            description: 'Mieszkanie o powierzchni 59,12 m2 (2-poziomowe) zlokalizowane w Rzeszowie ul. Aleja Generała Władysława Sikorskiego. Mieszkanie usytuowane jest na 3 piętrze, 3 piętrowego bloku. Do mieszkania należy komórka lokatorska, duży balkon. Nieruchomość jest w pełni umeblowane, posiada klimatyzacje oraz wyposażone jest w sprzęt AGD.',
            image: ''
        });
        setTitle('Hotel Słoneczna');
        setLoading(false);
    }
    
    useEffect(() => {
        setTimeout(() => {
            fetchHotel();
        }, 500);
    }, []);

    return loading ? <LoadingIcon /> : (
        <h1 className="container" >Hotel: {hotel.name} </h1>
    );
}

export default Hotel;