import React, { useState } from 'react'

import './style.scss'
import Pokemons from '../../types/Pokemons'
import axios from 'axios'

interface IProps{
    getPokemons: () => Promise<void>,
    setPokemons: React.Dispatch<React.SetStateAction<Pokemons[]>>
    setNext: React.Dispatch<React.SetStateAction<string|null>>
}

const Search: React.FC<IProps> = ({getPokemons, setPokemons, setNext}) => {
    const [searchInput, setSearchInput] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
    }

    const handleSearch = () => {
        const searchPokemon = async () => {
            const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
            const pokemonsRes: Pokemons[] = res.data.results
            setPokemons(pokemonsRes.filter(p => p.name.includes(searchInput)))
            setNext(null)
        }
        if(searchInput){
            searchPokemon()
        }else{
            getPokemons()
        }
    }
    
    return (
        <div className='search'>
            <div>
                <input type="text" name='search' onChange={handleChange} />
                <button onClick={handleSearch}>
                    Search
                </button>
            </div>
        </div>
    )
}

export default Search