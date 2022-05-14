import React from 'react';

import { Route, Routes, HashRouter, BrowserRouter } from 'react-router-dom';

import './App.css';

import Home from './components/Home';
// import Pokemons from './components/Pokemons';
import Pokemon from './components/Pokemon';

class App extends React.Component {
  render = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          {/* Obsolete route <Route path='/react-pokedex/pokemons' element={<Pokemons />}></Route>*/}
          <Route exact path='/pokemon/:id' element={<Pokemon />} ></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
