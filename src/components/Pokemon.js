import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import './Pokemon.css';

const PokemonTypesDB = [['normal', 'A8A878'], ['fire', 'F08030'], ['fighting', 'C03028'], ['water', '6890F0'], ['flying', 'A890F0'], ['grass', '78C850'], ['poison', 'A040A0'], ['electric', 'F8D030'], ['ground', 'E0C068'], ['psychic', 'F85888'], ['rock', 'B8A038'], ['ice', '98D8D8'], ['bug', 'A8B820'], ['dragon', '7038F8'], ['ghost', '705898'], ['dark', '705848'], ['steel', 'B8B8D0'], ['fairy', 'EE99AC']]

const Pokemon = (props) => {
    const [pokemon, setPokemon] = useState(0);
    const [types, setTypes] = useState([]);
    const [advancedStats, setAdvancedStats] = useState([]);
    const [sprite, setSprite] = useState('');
    const [bgcolor, setBgcolor] = useState('');
    
    const id = useParams().id;

    
    // Fetching and rendering pokemon data
    useEffect(() => {
        const fetchPokemons = async () => {
            const pokemonsRes = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1200');
            const pokemonsData = await pokemonsRes.json();

            const pokemonRes = await fetch(pokemonsData.results[id].url)
            const pokemonData = await pokemonRes.json();
            setSprite(pokemonData.sprites.front_default);
            setPokemon(pokemonData);
            
            const typesData = await pokemonData.types.map((slot) => {return {name: slot.type.name, url: slot.type.url}})
            setTypes(typesData);
            
            // matching types to get bgcolor
            setBgcolor(PokemonTypesDB.filter(type => type[0] === typesData[0].name)[0][1]); 

            const advancedStatsData = await pokemonData.stats.map((slot) => {return {name: slot.stat.name, base: slot.base_stat, effort: slot.effort}})
            setAdvancedStats(advancedStatsData);
        }
        
        fetchPokemons().catch(console.error);
    }, [id]);

    return (
        <div>
            <Helmet>
                <style>{`body { background-color: #${bgcolor === '' ? 'BE3232' : bgcolor};}`}</style>
            </Helmet>
            <header className='pokemon-header'>
                <div className='pokemon-header__details'>
                    <h1 className='pokemon-header__details__name'>{pokemon.name}</h1>
                    <p className='pokemon-header__details__number'>Num. {pokemon.id}</p>
                </div>
                <div className='pokemon-header__types'>
                    {
                        types.map((type, key) => {
                            console.log(PokemonTypesDB.filter(DBtype => DBtype[0] === type.name)[0][1]);
                            return (
                                <span
                                 className='pokemon-header__types__type' 
                                 key={key}
                                 style={{ backgroundColor: `#${PokemonTypesDB.filter(DBtype => DBtype[0] === type.name)[0][1]}` }}
                                 >
                                    {type.name}
                                </span>
                            )
                        })
                    }
                </div>
                <img title='Pokemon image' className={sprite ? `pokemon-header__image sprite` : 'pokemon-header__image'} src={sprite ? sprite : ''} alt='Pokeball icon jpg' />
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