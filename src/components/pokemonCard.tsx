import React, { useEffect, useState } from "react"
import Pokemon from "../types/Pokemon"
import api from "../api/api"
import { getBackgroundColorByType } from "../utils/pokemonUtils"
import "../css/pokemonCard.scss"

interface IProps {
    name: string
}

const PokemonCard: React.FC<IProps> = ({ name }) => {

    const [pokemon, setPokemon] = useState<Pokemon>();

    useEffect(() => {
        const loadPokemon = async () => {
            const poke = await api.get('pokemon/' + name)
            setPokemon(poke.data)
        }
        loadPokemon()
    }, [name])

    if (!pokemon) {
        return (
            <div>
                <p>loading</p>
            </div>
        )
    } else {
        let backgroundColor = getBackgroundColorByType(pokemon.types[0].type.name)
        if (pokemon.types[0].type.name === 'normal' && pokemon.types.length > 1) {
            backgroundColor = getBackgroundColorByType(pokemon.types[1].type.name)
        }
        return (
            <div className="wrapper">
                <div className="blur-wrapper">
                    <div className="card" style={{ backgroundColor: `rgb(${backgroundColor})` }}>
                        <img src={pokemon.sprites.front_default} alt="pokemon" loading="lazy" width={"100%"} />
                        <p className="name">{pokemon.name}</p>
                    </div>
                </div>
                <img src={pokemon.sprites.other["official-artwork"].front_default} className="overlay" alt="" />
            </div>
        )
    }
}
export default PokemonCard