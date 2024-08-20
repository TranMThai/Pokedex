import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import { usePokemon } from '../../contexts/PokemonContext'


const Evolution: React.FC = () => {

    const {pokemonChain} = usePokemon()

    return (
        <section className='evolution'>
            <div className='evolution-container'>
                {pokemonChain?.map(s => (
                    <span key={s.id}>
                        <Link to={`/${s.name}`} style={{ textDecoration: 'none' }}>
                            <div>
                                <div className="image-container">
                                    <div className='image-pokemon' style={{ backgroundColor: s.color }}>
                                        <img src={s.image} alt="" width={"50px"} />
                                    </div>
                                </div>
                                <div className='info-pokemon' style={{ color: s.color }}>
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