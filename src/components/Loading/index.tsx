import React from 'react'
import './style.scss'
import { usePokemon } from '../../contexts/PokemonContext'


const Loading: React.FC = () => {

    const { pokemonChain } = usePokemon()

    return (
        <section className='loading'>
            <span>Loading...</span>
        </section>
    )
}

export default Loading