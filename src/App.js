import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import Home from './components/Home';
import Pokemons from './components/Pokemons';
import Pokemon from './components/Pokemon';

class App extends React.Component {
  render = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/pokemons' element={<Pokemons />}></Route>
          <Route path='/pokemon/:id' element={<Pokemon />} ></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
