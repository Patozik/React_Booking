
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Hotels from './components/Hotels/Hotels';
import { Component } from 'react';
import LoadingIcon from './components/UI/LoadingIcon/LoadingIcon';
import Searchbar from './components/UI/Searchbar/Searchbar';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer';
import ThemeButton from './components/UI/ThemeButton/ThemeButton';

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
      theme: 'primary'
  };

  searchHandler = (term) => {
    const hotels = [...this.hotels]
      .filter(x => x.name
      .toLocaleLowerCase()
      .includes(term.toLocaleLowerCase()));
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
    return (
        <Layout
          header={
            <Header>
              <Searchbar 
                onSearch={term => this.searchHandler(term)} 
                theme={this.state.theme}/>
              <ThemeButton onChange={this.changeTheme}/>
            </Header>
          }
          menu={
            <Menu theme={this.state.theme}/>
          }
          content={
            this.state.loading
              ? <LoadingIcon theme={this.state.theme} />
              : <Hotels hotels={this.state.hotels} theme={this.state.theme} />
          }
          footer={
            <Footer theme={this.state.theme}/>
          }
        />
    );
  }
}

export default App;
