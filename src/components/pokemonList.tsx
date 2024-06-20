import React, { useEffect, useState } from "react"
import Pokemons from "../types/Pokemons"
import api from "../api/api"
import "../css/pokemonList.scss"
import PokemonCard from "./pokemonCard"

const PokemonList: React.FC = () => {

    const [pokemons, setPokemons] = useState<Pokemons[]>([])

    useEffect(() => {
        const getPokemons = async () => {
            const res = await api.get('pokemon?offset=0&limit=40')
            console.log(res.data.results)
            setPokemons(res.data.results)
        }
        getPokemons()
    }, [])

    return (
        <div className="container">
            <h2>Pokédex</h2>
            <div className="collection">
                {pokemons.map(p => {
                    return (
                        <PokemonCard
                            key={p.name}
                            name={p.name}
                        />
                    )
                })}
            </div>
        </div>
    )
}
export default PokemonList