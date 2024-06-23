import React, { useEffect, useState } from 'react'
import './style.scss'
import EvolutionChain, { EvolvesTo } from '../../../../types/EvolutionChain'
import axios from 'axios'
import Pokemon from '../../../../types/Pokemon'
import { Link } from 'react-router-dom'
import { backGroundColorType } from '../../../../constants/pokemonConstants'

interface IProps {
    evolutionChain: EvolutionChain
}
interface IEvolution {
    id: number;
    name: string;
    image: string;
    color: string|undefined;
}

const Evolution: React.FC<IProps> = ({ evolutionChain }) => {

    const [species, setSpecies] = useState<IEvolution[]>([]);

    useEffect(() => {

        const getSpecies = async (url: string): Promise<IEvolution> => {
            const resSpe = await axios.get(url)
            const resPo = await axios.get(resSpe.data.varieties[0].pokemon.url)
            const pokemon: Pokemon = resPo.data
            const type = pokemon.types[0].type.name==='normal'&&pokemon.types.length>1?pokemon.types[1].type.name:pokemon.types[0].type.name
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other['official-artwork'].front_default,
                color: backGroundColorType.get(type)
            }
        }

        const getEvolutionList = async (evo: EvolvesTo) => {
            const evolutionList: IEvolution[] = []

            const traverse = async (evo: EvolvesTo) => {
                const pokemon: IEvolution = await getSpecies(evo.species.url)
                evolutionList.push(pokemon)
                await Promise.all(evo.evolves_to.map(e => traverse(e)))
            }

            await traverse(evo)
            return evolutionList
        }

        const fetch = async () => {
            const species: IEvolution[] = await getEvolutionList(evolutionChain.chain)
            setSpecies(species)
        }

        fetch()

    }, [evolutionChain])

    return (
        <section className='evolution'>
            <div className='evolution-container'>
                {species.map(s => (
                    <span key={s.id}>
                        <Link to={`/detail/${s.name}`} style={{ textDecoration: 'none' }}>
                            <div>
                                <div className="image-container">
                                    <div className='image-pokemon' style={{ backgroundColor: s.color }}>
                                        <img src={s.image} alt="" width={"50px"} />
                                    </div>
                                </div>
                                <div className='info-pokemon' style={{color: s.color}}>
                                    <p className='id'>No.{s.id}</p>
                                    <p className='name'>{s.name}</p>
                                </div>
                            </div>
                        </Link>
                    </span>
                ))}
            </div>
        </section>
    )
}

export default Evolution