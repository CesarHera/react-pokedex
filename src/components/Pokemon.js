import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import pokeballIcon from '../images/pokeball-icon.jpg';

import './Pokemon.css';

const Pokemon = (props) => {
    const [pokemon, setPokemon] = useState(0);
    const [types, setTypes] = useState([]);
    const [advancedStats, setAdvancedStats] = useState([]);
    
    const id = useParams().id;

    useEffect(() => {
        const fetchPokemons = async () => {
            const pokemonsRes = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1200');
            const pokemonsData = await pokemonsRes.json();

            const pokemonRes = await fetch(pokemonsData.results[id].url)
            const pokemonData = await pokemonRes.json();
            setPokemon(pokemonData);

            const typesData = await pokemonData.types.map((slot) => {return {name: slot.type.name, url: slot.type.url}})
            setTypes(typesData);

            const advancedStatsData = await pokemonData.stats.map((slot) => {return {name: slot.stat.name, base: slot.base_stat, effort: slot.effort}})
            setAdvancedStats(advancedStatsData);
        }
        
        fetchPokemons().catch(console.error);
    }, [id]);

    return (
        <div>
            <header className='pokemon-header'>
                <div className='pokemon-header__details'>
                    <h1 className='pokemon-header__details__name'>{pokemon.name}</h1>
                    <p className='pokemon-header__details__number'>Num. #{pokemon.id}</p>
                </div>
                <div className='pokemon-header__types'>
                    {
                        types.map((type, key) => {
                            return (
                                <a
                                 href={type.url}
                                 className='pokemon-header__types__type' 
                                 key={key}>
                                     {type.name}
                                </a>
                            )
                        })
                    }
                </div>
                <img title='Pokemon image' className='pokemon-header__image' src={pokeballIcon} alt='Pokeball icon jpg' />
            </header>
            <main className='pokemon-main'>
                <div className='pokemon-main__stats--basic'>
                    <div className='pokemon-main__stats--basic__stat'>
                        <h2>Height</h2>
                        <p>{parseInt(pokemon.height) / 10} m</p>
                    </div>
                    <div className='pokemon-main__stats--basic__stat'>
                        <h2>Weight</h2>
                        <p>{parseInt(pokemon.weight) / 10} kg</p>
                    </div>
                    <div className='pokemon-main__stats--basic__stat'>
                        <h2>Base Experience</h2>
                        <p>{pokemon.base_experience}</p>
                    </div>
                </div>
                <ul className='pokemon-main__stats pokemon-main__stats--advanced'>
                    {   
                        advancedStats.map((stat, key) => {
                            return (
                                <li key={key} className='pokemon-main__stats--advanced__stat'>
                                    <h3 className='pokemon-main__stats--advanced__stat__name'>{stat.name.replace('-', ' ')}</h3>
                                    <div className='pokemon-main__stats--advanced__stat__values'>
                                        <span className='pokemon-main__stats--advanced__stat__values__base'>Base: {stat.base}</span>
                                        <span className='pokemon-main__stats--advanced__stat__values__effort'>Effort: {stat.effort}</span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </main>
        </div>
    )
}

export default Pokemon;