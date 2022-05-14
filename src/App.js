import React from 'react';

import { Route, Routes, HashRouter } from 'react-router-dom';

import './App.css';

import Home from './components/Home';
// import Pokemons from './components/Pokemons';
import Pokemon from './components/Pokemon';

class App extends React.Component {
  render = () => {
    return (
      <HashRouter>
        <Routes>
          <Route exact path='/#/react-pokedex' element={<Home />}></Route>
          {/* Obsolete route <Route path='/react-pokedex/pokemons' element={<Pokemons />}></Route>*/}
          <Route exact path='/#/react-pokedex/pokemon/:id' element={<Pokemon />} ></Route>
        </Routes>
      </HashRouter>
    );
  }
}

export default App;
