
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Hotels from './components/Hotels/Hotels';
import { Component } from 'react';
import LoadingIcon from './components/UI/LoadingIcon/LoadingIcon';

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
      loading: true
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

  render(){
    return (
      <div className="App">
        <Header onSearch={this.searchHandler}/>
        <Menu />
        {this.state.loading 
        ? <LoadingIcon />
        : <Hotels hotels={this.state.hotels} />
        }
      </div>
    );
  }
}

export default App;
