import './App.css';
import { Switch, Route } from 'react-router';
import CountryDetails from './components/CountryDetails';
import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';
import countries from './countries.json';


function App() {

  return (
    <div className="App">
      <Navbar />

      <Switch>
        <Route exact path="/" render={(countries)=>{<CountriesList {...countries}/>}} />
        <Route exact path="/countries/:id" component={CountryDetails} />
      </Switch>
    </div>
  );
}

export default App;
