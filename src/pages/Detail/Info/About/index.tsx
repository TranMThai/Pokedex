import React, { useEffect, useState } from 'react'
import Pokemon from '../../../../types/Pokemon'
import './style.scss'
import { colorType } from '../../../../constants/pokemonConstants'
import Icon from '../../../../assets/icons'

interface IProps {
    pokemon: Pokemon
    species: PokemonSpecies
    weakness: string[]
    strongness: string[]
}

const About: React.FC<IProps> = ({ pokemon, species, weakness, strongness }) => {

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