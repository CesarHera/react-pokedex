import React from "react";

import './Pokemons.css';

import pokeballIcon from '../images/pokeball-icon.jpg';

class Pokemons extends React.Component {
    state = {
        pokemons: [],
        searchTerm: '',
        resultsLimit: 0,
    };
    
    async componentDidMount() {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1200');
        const data = await res.json();
        this.setState({ pokemons: data.results });
    }
    
    render = () => {
        return (
            <div>
                <div className="pokemons">
                    <input
                        className="pokemons__input"
                        onChange={(e) => this.setState({searchTerm: e.target.value})}
                        type='text'
                        placeholder='Search a Pokemon'
                    />
                </div>
                <div className="pokemons-results">
                    {this.state.pokemons.map((poke, key) => {
                        if(this.state.searchTerm === '') {
                            return (
                                <a key={key} className="pokemons-results__pokemon" href={`https://cesarhera.github.io/react-pokedex/pokemon/${key}`}>
                                    <img src={pokeballIcon} alt='Pokeball icon png'></img>
                                    <div className="pokemons-results__pokemon__details">
                                        <p>Num. {key + 1}</p>
                                        <p><b>{poke.name}</b></p>
                                    </div>
                                </a>    
                            );
                        } else if(poke.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                            return (
                                <a key={key} className="pokemons-results__pokemon" href={`https://cesarhera.github.io/react-pokedex/pokemon/${key}`}>
                                    <img src={pokeballIcon} alt='Pokeball icon png'></img>
                                    <div className="pokemons-results__pokemon__details">
                                        <p>Num. {key + 1}</p>
                                        <p><b>{poke.name}</b></p>
                                    </div>
                                </a>    
                            );
                        } else {
                            return false;
                        }
                        })
                    }
                    <span className="pokemons-results__dots">. . .</span>
                </div>
            </div>
        )
    }
}

export default Pokemons;