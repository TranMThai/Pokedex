import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Pokemon from "../../types/Pokemon"
import api from "../../api/api"
import { backGroundColorType, colorType } from "../../constants/pokemonConstants"
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
            <div className="loading-card">
                Loading...
            </div>
        )
    } else {
        const type1 = pokemon.types[0].type.name
        const type2: string | undefined = pokemon.types[1]?.type.name
        return (
            <Link to={"/" + pokemon.name} style={{ width: "100%", textDecoration: "none" }}>
                <div className="wrapper">
                    <div className="blur-wrapper">
                        <div className="card" style={{ backgroundColor: backGroundColorType.get(type1==='normal'&&type2!=undefined?type2:type1) }}>
                            <span>No.{pokemon.id}</span>
                            <img src={pokemon.sprites.front_default} alt="pokemon" className="image-pokemon" loading="lazy"/>
                            <div className="blur-layer"></div>
                        </div>
                    </div>
                    <p className="name">{pokemon.name}</p>
                    <div className="types">
                        {
                            pokemon.types.map(t => {
                                return (
                                    <span className="type" key={pokemon.id + "_" + t.slot}>
                                        <span style={{ backgroundColor: colorType.get(t.type.name) }}>
                                            <img src={Icon[t.type.name]} alt="" />
                                        </span>
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