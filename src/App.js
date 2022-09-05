
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Hotels from './components/Hotels/Hotels';
import React, { Component } from 'react';
import LoadingIcon from './components/UI/LoadingIcon/LoadingIcon';
import Searchbar from './components/UI/Searchbar/Searchbar';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer';
import ThemeButton from './components/UI/ThemeButton/ThemeButton';
import ThemeContext from './context/themeContext';
import AuthContex from './context/authContext';


class App extends Component {

  hotels = [
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
    },
  ]

  state = {
      hotels: [],
      loading: true,
      theme: 'primary',
      isAuthenticated: false
  };

  searchHandler = (term) => {
    const hotels = [...this.hotels]
      .filter(x => x.name
      .toLowerCase()
      .includes(term.toLowerCase()));
    this.setState({ hotels });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ 
        hotels: this.hotels, 
        loading: false 
      });
    }, 1000);
  }

  changeTheme = () => {
    const newTheme = this.state.theme === 'primary' ? 'secondary' : 'primary';
    this.setState({ theme: newTheme });
  }

  render(){
    const header = (
      <Header>
        <Searchbar
          onSearch={term => this.searchHandler(term)} />
        <ThemeButton />
      </Header>
    );
    const menu = (
      <Menu />
    );
    const content = (
      this.state.loading
        ? <LoadingIcon />
        : <Hotels hotels={this.state.hotels} />
    );
    const footer = (
      <Footer />
    );

    return (
      <AuthContex.Provider value={{ 
        isAuthenticated: this.state.isAuthenticated,
        login: () => this.setState({ isAuthenticated: true }),
        logout: () => this.setState({ isAuthenticated: false })
      }}>
        <ThemeContext.Provider value={{
          color: this.state.theme,
          changeTheme: this.changeTheme
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
}

export default App;
