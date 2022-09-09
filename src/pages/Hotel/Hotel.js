import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";

function Hotel(props) {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const fetchHotel = () => {
        setHotel({
            id: 2,
            name: 'Słoneczna',
            city: 'Warszawa',
            rating: 7.3,
            description: 'Mieszkanie o powierzchni 59,12 m2 (2-poziomowe) zlokalizowane w Rzeszowie ul. Aleja Generała Władysława Sikorskiego. Mieszkanie usytuowane jest na 3 piętrze, 3 piętrowego bloku. Do mieszkania należy komórka lokatorska, duży balkon. Nieruchomość jest w pełni umeblowane, posiada klimatyzacje oraz wyposażone jest w sprzęt AGD.',
            image: ''
        });
        setLoading(false);
    }
    
    useEffect(() => {
        setTimeout(() => {
            fetchHotel();
        }, 500);
    }, []);

    return loading ? <LoadingIcon /> : (
        <h1>Hotel: {hotel.name} </h1>
    );
}

export default Hotel;