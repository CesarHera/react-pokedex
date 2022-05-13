import React from "react";

import Pokemons from "./Pokemons";

import './Home.css';

class Home extends React.Component {
    render() {
        return (
            <div>
              <header className='home__header'>
                <nav className='home__header__nav'>
                  <ul className='home__header__nav--desktop'>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="https://github.com/CesarHera">Github</a>
                    </li>
                    <li>
                      <a href="https://cesarhera.github.io/web-portfolio/">Portfolio</a>
                    </li>
                  </ul>
                  <div className='home__header__nav--mobile'> {/*Pending to finish*/}
                    <i className="home__header__nav--mobile__trigger"></i>
                    <ul className="home__header__nav--mobile__list">
                      <li>
                        <a href="/">Home</a>
                      </li>
                      <li>
                        <a href="https://github.com/CesarHera">Github</a>
                      </li>
                      <li>
                        <a href="https://cesarhera.github.io/web-portfolio/">Portfolio</a>
                      </li>
                    </ul>
                  </div>
                </nav>
                <h1 className='home__header__title'>Pokedex</h1>
              </header>
              <main className='home__routes'>
                <Pokemons />
              </main>
            </div>
        )
    }
}


export default Home;