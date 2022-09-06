import { useEffect, useState, useLayoutEffect } from "react";

const quotes = [
    'Nie odkładaj marzeń, odkładaj na marzenia.',
    'Ten kto żyje widzi dużo, ten kto podróżuje widzi więcej.',
    'Podróże to jedyna rzecz na którą wydajemy pieniądze, a stajemy się bogatsi.'
];

const styles = {
    position: 'absolute',
    padding: '10px',
    top: '20px',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#000',
    fontStyle: 'italic',
    background: 'rgba(255, 255, 255, 0.9)'
}

function InspiringQuote(props) {

    const [quote, setQuote] = useState('Wczytywanie cytatu...');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //pobieranie cytatu...
        setLoading(false);
    }, []);

    useLayoutEffect(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, [loading]);

    return (
        <p style={styles}>{quote}</p>
    );
}

export default InspiringQuote;