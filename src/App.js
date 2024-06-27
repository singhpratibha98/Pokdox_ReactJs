// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Components/pok.css';


const App = () => {

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {

    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        setPokemon(response.data.results);
        console.log(response);
      } catch (err) {
        setError(err.message);
        // console.log("Pokemon not found");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPokemon = pokemon.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='app'>
      <h1>Pokémon List</h1>
      <input className='search-input'
        type="text"
        placeholder="Search Pokémon"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {
        loading ? (
          <div className='loading'>Loading...</div>
        ) : error ?(
          <div className='error'>Error: {error}</div>
        ) : (
          <div className='pokemon-grid'>
        {filteredPokemon.map((p, index) => (
          
          <div className='pokemon-card' key={index}>
            {p.name}
            </div>


        ))}

      </div>

        )
      }
      
    </div>
  );
};

export default App;
