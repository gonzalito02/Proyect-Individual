import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateNewPokemon from './components/CreateNewPokemon'
import PokemonDetail from './components/PokemonDetail'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element = {<LandingPage/>}/>
          <Route path="/home" element = {<Home/>}/>
          <Route path="/createPokemon" element = {<CreateNewPokemon/>}/>
          <Route path="/home/:id" element = {<PokemonDetail/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

//"react-router-dom": "^6.3.0" ---> por esta razon se usa Routes and Route
// en vez de component se usa element y se agregan los < />


export default App;
