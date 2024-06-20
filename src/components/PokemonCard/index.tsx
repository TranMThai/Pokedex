import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Pokemon from "../../types/Pokemon"
import api from "../../api/api"
import { getBackgroundColorByType } from "../../utils/PokemonUtils"
import "./style.scss"
import Icon from "../../assets/icons"

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
            <div className="loading">
                Loading...
            </div>
        )
    } else {
        let backgroundColor = getBackgroundColorByType(pokemon.types[0].type.name)
        if (pokemon.types[0].type.name === 'normal' && pokemon.types.length > 1) {
            backgroundColor = getBackgroundColorByType(pokemon.types[1].type.name)
        }
        return (
            <Link to={"/detail/" + pokemon.name} style={{ width: "22.5%", textDecoration: "none" }}>
                <div className="wrapper">
                    <div className="blur-wrapper">
                        <div className="card" style={{ backgroundColor: `rgb(${backgroundColor})` }}>
                            <span>#{pokemon.id}</span>
                            <img src={pokemon.sprites.front_default} alt="pokemon" loading="lazy" width={"100%"} />
                        </div>
                    </div>
                    <p className="name">{pokemon.name}</p>
                    <div className="types">
                        {
                            pokemon.types.map(t => {
                                return (
                                    <span className="type" key={pokemon.id + "_" + t.slot}>
                                        <img src={Icon[t.type.name]} alt="" style={{ backgroundColor: `rgb(${getBackgroundColorByType(t.type.name)})` }}/>
                                        {t.type.name}
                                    </span>
                                )
                            })
                        }
                    </div>
                    <img src={pokemon.sprites.other["official-artwork"].front_default} className="overlay" alt="" />
                </div>
            </Link>
        )
    }
}
export default PokemonCard