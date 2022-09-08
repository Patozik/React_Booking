
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Hotels from './components/Hotels/Hotels';
import { useEffect, useReducer } from 'react';
import LoadingIcon from './components/UI/LoadingIcon/LoadingIcon';
import Searchbar from './components/UI/Searchbar/Searchbar';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer';
import ThemeButton from './components/UI/ThemeButton/ThemeButton';
import ThemeContext from './context/themeContext';
import AuthContex from './context/authContext';
import BestHotel from './components/Hotels/BestHotel/BestHotel';
import InspiringQuote from './components/InspiringQuote/InspiringQuote';
import LastHotel from './components/Hotels/LastHotel/LastHotel';
import useStateStorage from './hooks/useStateStorage';
import useWebsiteTitle from './hooks/useWebsiteTitle';

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

const reducer = (state, action) => {
  switch (action.type) {
    case 'change-theme' :
      const theme = state.theme === 'primary' ? 'warning' : 'primary';
      return {...state, theme };
    case 'set-hotels' :
      return {...state, hotels: action.hotels}; 
    case 'set-loading':
      return { ...state, loading: action.loading};
    case 'login':
      return { ...state, isAuthenticated: true };
    case 'logout':
      return { ...state, isAuthenticated: false };
    default :
      throw new Error('Nie ma takiej akcji: ' + action.type);
  }
}

const initialState = {
  hotels: [],
  loading: true,
  isAuthenticated: true,
  theme: 'primary'
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [lastHotel, setLastHotel] = useStateStorage('last-hotel', null);

  useWebsiteTitle('Strona główna');

  const searchHandler = term => {
    const newHotels = [...backendHotels]
      .filter(x => x.name
        .toLowerCase()
        .includes(term.toLowerCase()));
    dispatch({ type: 'set-hotels', hotels: newHotels});
  }

  const getBestHotel = () => {
    if (state.hotels.length < 2 ) {
      return null;
    } else {
      return state.hotels
        .sort((a, b) => a.rating > b.rating ? -1 : 1 ) [0];
    }
  }

  const openHotel = (hotel) => setLastHotel(hotel);

  const removeLastHotel = () => setLastHotel(null);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'set-hotels', hotels: backendHotels });
      dispatch({ type: 'set-loading', loading: false });
    }, 1000);
  }, []);

  const header = (
    <Header>
      <InspiringQuote />
      <Searchbar
        onSearch={term => searchHandler(term)} />
      <ThemeButton />
    </Header>
  );
  const menu = (
    <Menu />
  );
  const content = (
    state.loading
      ? <LoadingIcon />
      : (
        <>
          {lastHotel ? <LastHotel {...lastHotel} onRemove={removeLastHotel}/> : null}
          {getBestHotel() ? <BestHotel getHotel={getBestHotel} /> : null}
          <Hotels onOpen={openHotel} hotels={state.hotels} />
        </>
      )
  );
  const footer = (
    <Footer />
  );

  return (
    <AuthContex.Provider value={{
      isAuthenticated: state.isAuthenticated,
      login: () => dispatch({ type: 'login'}),
      logout: () => dispatch({ type: 'logout'}),
    }}>
      <ThemeContext.Provider value={{
        color: state.theme,
        changeTheme: () => dispatch({ type: 'change-theme' })
      }}>
        <Layout
          header={header}
          menu={menu}
          content={content}
          footer={footer}
        />
      </ThemeContext.Provider>
    </AuthContex.Provider>
  );
}

export default App;
