import React, { useEffect, useState } from 'react'
import Pokemon from '../../../../types/Pokemon'
import axios from 'axios'
import './style.scss'
import Type from '../../../../types/Type'
import { colorType } from '../../../../utils/PokemonUtils'
import Icon from '../../../../assets/icons'

interface IProps {
    pokemon: Pokemon
}

const About: React.FC<IProps> = ({ pokemon }) => {

    const [species, setSpecies] = useState<PokemonSpecies>()
    const [type, setType] = useState<Type[]>([])
    const [weakness, setWeakness] = useState<string[]>([])
    const [strongness, setStrongness] = useState<string[]>([])

    useEffect(() => {
        const getPokemonSpecies = async () => {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)
            setSpecies(res.data)
        }
        getPokemonSpecies();
        const getType = async (url: string) => {
            const res = await axios.get(url)
            setType(p => [...p, res.data])
        }
        pokemon.types.forEach(t => {
            getType(t.type.url)
        })
    }, [])

    useEffect(() => {

        const weaknesses = new Set(weakness)
        const strongnesses = new Set(strongness)
        type.forEach(t => {

            t.damage_relations.no_damage_to.forEach(d => {
                weaknesses.add(d.name)
            })
            t.damage_relations.double_damage_from.forEach(d => {
                weaknesses.add(d.name)
            })

            t.damage_relations.no_damage_from.forEach(d => {
                strongnesses.add(d.name)
            })
            t.damage_relations.double_damage_to.forEach(d => {
                strongnesses.add(d.name)
            })
        })

        const weaknessesClone = [...weaknesses]
        const strongnessesClone = [...strongnesses]

        setWeakness(weaknessesClone.filter(e => !strongnessesClone.includes(e) && e !== pokemon.types[0].type.name && e !== pokemon.types[1]?.type.name))
        setStrongness(strongnessesClone.filter(e => !weaknessesClone.includes(e) && e !== pokemon.types[0].type.name && e !== pokemon.types[1]?.type.name))

    }, [type])


    if (species) {
        const flavorText = species.flavor_text_entries.find(t => t.language.name === 'en')
        const genus = species.genera.find(t => t.language.name === 'en')

        return (
            <section className='about'>
                <p className='flavor-text'>{flavorText?.flavor_text.replace(/\n/g, ' ').replace(/\f/g, ' ')}</p>
                <div className='data-training'>
                    <div className='data'>
                        <h3>Pokédex Data</h3>
                        <div>
                            <div>
                                <strong>Species</strong>
                                <span>{genus?.genus}</span>
                            </div>
                            <div>
                                <strong>Weight</strong>
                                <span>{pokemon.weight / 10}kg</span>
                            </div>
                            <div>
                                <strong>Height</strong>
                                <span>{pokemon.height / 10}m</span>
                            </div>
                            <div>
                                <strong>Abilities</strong>
                                <span className='abilities'>
                                    {pokemon.abilities.map((a, i) => (
                                        <span key={a.ability.name}>
                                            <span>{i + 1}. {a.ability.name}{a.is_hidden ? ' (Hidden)' : ''}</span>
                                            <br />
                                        </span>
                                    ))}
                                </span>
                            </div>
                            <div>
                                <strong>Strongness</strong>
                                {strongness.map(type => (
                                    <span key={type} className='icon-type' style={{ backgroundColor: colorType.get(type) }} >
                                        <img src={Icon[type]} alt="" />{type}
                                    </span>
                                ))}
                            </div>
                            <div>
                                <strong>Weakness</strong>
                                {weakness.map(type => (
                                    <span key={type} className='icon-type' style={{ backgroundColor: colorType.get(type) }} >
                                        <img src={Icon[type]} alt="" />{type}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='training'>
                        <h3>Training</h3>
                        <div>
                            <div>
                                <strong>Catch rate</strong>
                                <span>{species.capture_rate}</span>
                            </div>
                            <div>
                                <strong>Base happiness</strong>
                                <span>{species.base_happiness}</span>
                            </div>
                            <div>
                                <strong>Growth rate</strong>
                                <span>{species.growth_rate.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default About